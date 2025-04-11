import type { IModule, IModuleInfo } from '@cabloy/module-info';
import type { TypeBeanScopeRecordKeys } from '../../bean/type.js';
import type { IModuleMainSys, IModuleResource, IMonkeyModule, IMonkeySys, PluginZovaModulesMeta, TypeMonkeyName } from '../../types/index.js';
import * as ModuleInfo from '@cabloy/module-info';
import { shallowReactive } from 'vue';
import { BeanSimple } from '../../bean/beanSimple.js';
import { SymbolInstalled } from '../../types/index.js';
import { StateLock } from '../../utils/stateLock.js';
import { deepExtend } from '../sys/util.js';

export class SysModule extends BeanSimple {
  public modulesMeta: PluginZovaModulesMeta;
  private modules: Record<string, IModule> = shallowReactive({});
  private mainInstances: Record<string, IModuleMainSys> = {};
  private monkeyInstances: Record<string, IMonkeyModule & IMonkeySys> = {};

  /** @internal */
  public async initialize(modulesMeta: PluginZovaModulesMeta) {
    this.modulesMeta = modulesMeta;
    await this._loadAllMonkeysAndSyncsAndPreloads();
    await this._requireAllSpecifics('preload');
    await this._requireAllSpecifics('monkey');
    await this._requireAllSpecifics('sync');
    if (process.env.SERVER) {
      await this._requireAllOthers();
    }
  }

  get<K extends TypeBeanScopeRecordKeys>(moduleName: K): IModule | undefined;
  get(moduleName: string): IModule | undefined;
  get(moduleName: IModuleInfo): IModule | undefined;
  get(moduleName: string | IModuleInfo): IModule | undefined {
    // module info
    if (!moduleName) return undefined;
    const moduleInfo = typeof moduleName === 'string' ? ModuleInfo.parseInfo(moduleName) : moduleName;
    if (!moduleInfo) throw new Error(`invalid module name: ${moduleName}`);
    // get
    const module = this.modules[moduleInfo.relativeName];
    if (!module) {
      return undefined;
    }
    if (!module[SymbolInstalled] || !module[SymbolInstalled].state) {
      return undefined;
    }
    return module;
  }

  exists<K extends TypeBeanScopeRecordKeys>(moduleName: K): boolean;
  exists(moduleName: string): boolean;
  exists(moduleName: IModuleInfo): boolean;
  exists(moduleName: string | IModuleInfo): boolean {
    // module info
    if (!moduleName) return false;
    const moduleInfo = typeof moduleName === 'string' ? ModuleInfo.parseInfo(moduleName) : moduleName;
    if (!moduleInfo) throw new Error(`invalid module name: ${moduleName}`);
    const moduleRepo = this.modulesMeta.modules[moduleInfo.relativeName];
    return !!moduleRepo;
  }

  private async _loadAllMonkeysAndSyncsAndPreloads() {
    const moduleNames: string[] = [];
    for (const moduleName of this.modulesMeta.moduleNames) {
      const module = this.modulesMeta.modules[moduleName];
      const info = module.info;
      const shouldLoad = process.env.SERVER || (info.capabilities?.monkey || info.capabilities?.sync || info.capabilities?.preload);
      if (shouldLoad) {
        const moduleResource = module.resource as any;
        if (typeof moduleResource === 'function') {
          moduleNames.push(moduleName);
        }
      }
    }
    await this.loadModules(moduleNames);
  }

  public async loadModules(moduleNames: string[]) {
    if (moduleNames.length === 0) return;
    const promises: Promise<IModuleResource>[] = [];
    const moduleNamesLoading: string[] = [];
    for (const moduleName of moduleNames) {
      const module = this.modulesMeta.modules[moduleName];
      if (!module) throw new Error(`module not found: ${moduleName}`);
      const moduleResource = module.resource as any;
      if (typeof moduleResource === 'function') {
        promises.push(moduleResource());
        moduleNamesLoading.push(moduleName);
      }
    }
    const modulesResource = await Promise.all(promises);
    for (let i = 0; i < modulesResource.length; i++) {
      const moduleName = moduleNamesLoading[i];
      this.modulesMeta.modules[moduleName].resource = modulesResource[i];
    }
  }

  private async _requireAllSpecifics(capabilityName: 'preload' | 'monkey' | 'sync') {
    for (const moduleName of this.modulesMeta.moduleNames) {
      const module = this.modulesMeta.modules[moduleName];
      if (module.info.capabilities?.[capabilityName]) {
        await this._install(moduleName, module);
      }
    }
  }

  private async _requireAllOthers() {
    for (const moduleName of this.modulesMeta.moduleNames) {
      const module = this.modulesMeta.modules[moduleName];
      const info = module.info;
      const shouldInstall = (!info.capabilities?.monkey && !info.capabilities?.sync && !info.capabilities?.preload);
      if (shouldInstall) {
        await this._install(moduleName, module);
      }
    }
  }

  private async _install(moduleName: string, moduleRepo: IModule) {
    // check
    if (this.modules[moduleName]) {
      const module = this.modules[moduleName];
      // should check state, otherwise infinite loop
      if (module[SymbolInstalled].state) return;
      // wait
      await module[SymbolInstalled].wait();
      // scope: should after [SymbolInstalled].touch
      await this.sys.bean._getBean(`${moduleName}.scope.module` as any, false);
      return;
    }
    // state
    const module = moduleRepo;
    module[SymbolInstalled] = StateLock.create();
    // record
    this.modules[moduleName] = module;
    // install
    await this._installInner(moduleName, module, moduleRepo);
    // installed
    module[SymbolInstalled].touch();
    // scope: should after [SymbolInstalled].touch
    await this.sys.bean._getBean(`${moduleName}.scope.module` as any, false);
    // monkey: moduleLoaded
    await this._monkeyModule('moduleLoaded', module);
  }

  private async _installInner(moduleName: string, module: IModule, moduleRepo: IModule) {
    // load
    if (typeof moduleRepo.resource === 'function') {
      const moduleResource = moduleRepo.resource as any;
      module.resource = moduleRepo.resource = await moduleResource();
    }
    // main / monkey
    if (module.resource.MainSys) {
      this.mainInstances[moduleName] = this.app.bean._newBeanSimple(module.resource.MainSys, false, module);
    }
    if (module.resource.MonkeySys) {
      this.monkeyInstances[moduleName] = this.app.bean._newBeanSimple(module.resource.MonkeySys, false, module);
    }
    // monkey: moduleLoading
    await this._monkeyModule('moduleLoading', module);
    // register resources
    await this._registerResources(module);
  }

  private async _registerResources(module: IModule) {
    this._registerLocales(module);
    this._registerErrors(module);
    this._registerConstants(module);
    await this._registerConfig(module);
  }

  private _registerErrors(module: IModule) {
    if (!module.resource.Errors) return;
    this.sys.meta.error.errors[module.info.relativeName] = module.resource.Errors;
  }

  private _registerLocales(module: IModule) {
    this.sys.meta.locale._registerLocales(module.info.relativeName, module.resource.locales);
  }

  private _registerConstants(module: IModule) {
    if (!module.resource.constants) return;
    const relativeName = module.info.relativeName;
    this.sys.constant.modules[relativeName] = deepExtend(
      {},
      module.resource.constants,
      this.sys.constant.modules[relativeName],
    );
  }

  private async _registerConfig(module: IModule) {
    if (!module.resource.config) return;
    // config
    const config = await module.resource.config(this.sys, this.sys.config.meta);
    // monkey
    await this._monkeyModule('configLoaded', module, config);
    // extend
    const relativeName = module.info.relativeName;
    this.sys.config.modules[relativeName] = deepExtend({}, config, this.sys.config.modules[relativeName]);
  }

  /** @internal */
  public async _monkeyModule(monkeyName: TypeMonkeyName, moduleTarget?: IModule, ...monkeyData: any[]) {
    // self: main
    if (moduleTarget && moduleTarget.mainInstance && moduleTarget.mainInstance[monkeyName]) {
      // @ts-ignore ignore
      await this.app.vue.runWithContext(async () => {
        await moduleTarget.mainInstance[monkeyName](...monkeyData);
      });
    }
    // module monkey
    for (const key of this.modulesMeta.moduleNames) {
      const moduleMonkey: IModule = this.modulesMeta.modules[key];
      if (moduleMonkey.info.capabilities?.monkey) {
        const module = this.modules[key];
        if (module && module.monkeyInstance && module.monkeyInstance[monkeyName]) {
          await this.app.vue.runWithContext(async () => {
            if (moduleTarget === undefined) {
              // @ts-ignore ignore
              await module.monkeyInstance[monkeyName](...monkeyData);
            } else {
              // @ts-ignore ignore
              await module.monkeyInstance[monkeyName](moduleTarget, ...monkeyData);
            }
          });
        }
      }
    }
    // app monkey
    const appMonkey = this.app.meta.appMonkey;
    if (appMonkey && appMonkey[monkeyName]) {
      await this.app.vue.runWithContext(async () => {
        if (moduleTarget === undefined) {
          // @ts-ignore ignore
          await appMonkey[monkeyName](...monkeyData);
        } else {
          // @ts-ignore ignore
          await appMonkey[monkeyName](moduleTarget, ...monkeyData);
        }
      });
    }
  }

  /** @internal */
  public _monkeyModuleSync(monkeyName: TypeMonkeyName, moduleTarget?: IModule, ...monkeyData: any[]) {
    // self: main
    if (moduleTarget && moduleTarget.mainInstance && moduleTarget.mainInstance[monkeyName]) {
      // @ts-ignore ignore
      this.app.vue.runWithContext(() => {
        moduleTarget.mainInstance[monkeyName](...monkeyData);
      });
    }
    // module monkey
    for (const key of this.modulesMeta.moduleNames) {
      const moduleMonkey: IModule = this.modulesMeta.modules[key];
      if (moduleMonkey.info.capabilities?.monkey) {
        const module = this.modules[key];
        if (module && module.monkeyInstance && module.monkeyInstance[monkeyName]) {
          this.app.vue.runWithContext(() => {
            if (moduleTarget === undefined) {
              // @ts-ignore ignore
              module.monkeyInstance[monkeyName](...monkeyData);
            } else {
              // @ts-ignore ignore
              module.monkeyInstance[monkeyName](moduleTarget, ...monkeyData);
            }
          });
        }
      }
    }
    // app monkey
    const appMonkey = this.app.meta.appMonkey;
    if (appMonkey && appMonkey[monkeyName]) {
      this.app.vue.runWithContext(() => {
        if (moduleTarget === undefined) {
          // @ts-ignore ignore
          appMonkey[monkeyName](...monkeyData);
        } else {
          // @ts-ignore ignore
          appMonkey[monkeyName](moduleTarget, ...monkeyData);
        }
      });
    }
  }
}
