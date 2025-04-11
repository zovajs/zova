import type { IModule, IModuleInfo } from '@cabloy/module-info';
import type { TypeBeanScopeRecordKeys } from '../../bean/type.js';
import type { IModuleMain, IModuleResource, IMonkeyApp, IMonkeyController, IMonkeyModule, TypeMonkeyName } from '../../types/index.js';
import * as ModuleInfo from '@cabloy/module-info';
import { shallowReactive } from 'vue';
import { BeanSimple } from '../../bean/beanSimple.js';
import { SymbolInstalled } from '../../types/index.js';
import { StateLock } from '../../utils/stateLock.js';
import { deepExtend } from '../sys/util.js';

export class AppModule extends BeanSimple {
  private modules: Record<string, IModule> = shallowReactive({});
  private mainInstances: Record<string, IModuleMain> = {};
  private monkeyInstances: Record<string, IMonkeyModule & IMonkeyApp & IMonkeyController> = {};

  /** @internal */
  public async initialize() {
    await this._loadAllMonkeysAndSyncsAndPreloads();
    await this._requireAllSpecifics('preload');
    await this._requireAllSpecifics('monkey');
    await this._requireAllSpecifics('sync');
  }

  get<K extends TypeBeanScopeRecordKeys>(moduleName: K, forceLoad?: boolean): IModule | undefined;
  get(moduleName: string, forceLoad?: boolean): IModule | undefined;
  get(moduleName: IModuleInfo, forceLoad?: boolean): IModule | undefined;
  get(moduleName: string | IModuleInfo, forceLoad?: boolean): IModule | undefined {
    // module info
    if (!moduleName) return undefined;
    const moduleInfo = typeof moduleName === 'string' ? ModuleInfo.parseInfo(moduleName) : moduleName;
    if (!moduleInfo) throw new Error(`invalid module name: ${moduleName}`);
    // get
    const module = this.modules[moduleInfo.relativeName];
    if (!module) {
      // module not loaded, so async use to raise the next call
      if (forceLoad !== false) {
        this.use(moduleInfo.relativeName);
      }
      return undefined;
    }
    if (!module[SymbolInstalled] || !module[SymbolInstalled].state) {
      return undefined;
    }
    return module;
  }

  async use<K extends TypeBeanScopeRecordKeys>(moduleName: K): Promise<IModule>;
  async use(moduleName: string): Promise<IModule>;
  async use(moduleName: IModuleInfo): Promise<IModule>;
  async use(moduleName?: string | IModuleInfo): Promise<IModule> {
    // module info
    if (!moduleName) throw new Error('should specify the module name');
    const moduleInfo = typeof moduleName === 'string' ? ModuleInfo.parseInfo(moduleName) : moduleName;
    if (!moduleInfo) throw new Error(`invalid module name: ${moduleName}`);
    const relativeName = moduleInfo.relativeName;
    // should not try check get directly
    // const module = this.getOnly(relativeName);
    // if (module) return module;
    // module
    const moduleRepo = this.modulesMeta.modules[relativeName];
    if (!moduleRepo) throw new Error(`module not exists: ${relativeName}`);
    // install
    await this._install(relativeName, moduleRepo);
    // ok
    return moduleRepo;
  }

  exists<K extends TypeBeanScopeRecordKeys>(moduleName: K): boolean;
  exists(moduleName: string): boolean;
  exists(moduleName: IModuleInfo): boolean;
  exists(moduleName: string | IModuleInfo): boolean {
    return this.sys.meta.module.exists(moduleName as any);
  }

  private async _loadAllMonkeysAndSyncsAndPreloads() {
    const moduleNames: string[] = [];
    for (const moduleName of this.modulesMeta.moduleNames) {
      const module = this.modulesMeta.modules[moduleName];
      const info = module.info;
      if (info.capabilities?.monkey || info.capabilities?.sync || info.capabilities?.preload) {
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

  private async _install(moduleName: string, moduleRepo: IModule) {
    // check
    if (this.modules[moduleName]) {
      const module = this.modules[moduleName];
      // should check state, otherwise infinite loop
      if (module[SymbolInstalled].state) return;
      // wait
      await module[SymbolInstalled].wait();
      // scope: should after [SymbolInstalled].touch
      await this.app.bean._getBean(`${moduleName}.scope.module` as any, false);
      return;
    }
    // clone for ssr
    const module = Object.assign({}, moduleRepo);
    module[SymbolInstalled] = StateLock.create();
    // record
    this.modules[moduleName] = module;
    // install
    await this._installInner(moduleName, module, moduleRepo);
    // installed
    module[SymbolInstalled].touch();
    // scope: should after [SymbolInstalled].touch
    await this.app.bean._getBean(`${moduleName}.scope.module` as any, false);
    // monkey: moduleLoaded
    await this._monkeyModule('moduleLoaded', module);
  }

  private async _installInner(_moduleName: string, module: IModule, moduleRepo: IModule) {
    // load
    if (typeof moduleRepo.resource === 'function') {
      const moduleResource = moduleRepo.resource as any;
      module.resource = moduleRepo.resource = await moduleResource();
    }
    // main / monkey
    if (module.resource.Main) {
      module.mainInstance = this.app.bean._newBeanSimple(module.resource.Main, false, module);
    }
    if (module.resource.Monkey) {
      module.monkeyInstance = this.app.bean._newBeanSimple(module.resource.Monkey, false, module);
    }
    // monkey: moduleLoading
    await this._monkeyModule('moduleLoading', module);
    // register resources
    await this._registerResources(module);
  }

  private async _registerResources(module: IModule) {
    this._registerComponents(module);
    this._registerLocales(module);
    this._registerErrors(module);
    this._registerConstants(module);
    await this._registerConfig(module);
  }

  private _registerComponents(module: IModule) {
    this.app.meta.component._registerComponents(module.info.relativeName, module.resource.components);
  }

  private _registerErrors(module: IModule) {
    if (!module.resource.Errors) return;
    this.app.meta.error.errors[module.info.relativeName] = module.resource.Errors;
  }

  private _registerLocales(module: IModule) {
    this.app.meta.locale._registerLocales(module.info.relativeName, module.resource.locales);
  }

  private _registerConstants(module: IModule) {
    if (!module.resource.constants) return;
    const relativeName = module.info.relativeName;
    this.app.constant.modules[relativeName] = deepExtend(
      {},
      module.resource.constants,
      this.app.constant.modules[relativeName],
    );
  }

  private async _registerConfig(module: IModule) {
    if (!module.resource.config) return;
    // config
    const config = await module.resource.config(this.app, this.sys.config.meta);
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
