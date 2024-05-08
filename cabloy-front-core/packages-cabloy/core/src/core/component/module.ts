import { IModule, IModuleInfo } from '@cabloy/module-info';
import * as ModuleInfo from '@cabloy/module-info';
import { BeanSimple } from '../../bean/beanSimple.js';
import { shallowReactive } from 'vue';
import { IModuleResource, PluginCabloyModulesMeta, TypeMonkeyName } from '../../types/index.js';
import { StateLock } from '../../utils/stateLock.js';
import { TypeBeanScopeRecordKeys } from '../../bean/type.js';

export class AppModule extends BeanSimple {
  private modulesMeta: PluginCabloyModulesMeta;
  private modules: Record<string, IModule> = shallowReactive({});

  /** @internal */
  public async initialize(modulesMeta: PluginCabloyModulesMeta) {
    this.modulesMeta = modulesMeta;
    await this._loadAllMonkeysAndSyncs();
    await this._requireAllMonkeys();
    await this._requireAllSyncs();
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
    if (!module.__installed__ || !module.__installed__.state) {
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

  private async _loadAllMonkeysAndSyncs() {
    const promises: Promise<IModuleResource>[] = [];
    const moduleNames: string[] = [];
    for (const moduleName of this.modulesMeta.moduleNames) {
      const module = this.modulesMeta.modules[moduleName];
      const info = module.info;
      if (info.monkey || info.sync) {
        const moduleResource = module.resource as any;
        promises.push(moduleResource());
        moduleNames.push(moduleName);
      }
    }
    const modulesResource = await Promise.all(promises);
    for (let i = 0; i < modulesResource.length; i++) {
      const moduleName = moduleNames[i];
      this.modulesMeta.modules[moduleName].resource = modulesResource[i];
    }
  }

  private async _requireAllMonkeys() {
    for (const moduleName of this.modulesMeta.moduleNames) {
      const module = this.modulesMeta.modules[moduleName];
      if (module.info.monkey) {
        await this._install(moduleName, module);
      }
    }
  }

  private async _requireAllSyncs() {
    for (const moduleName of this.modulesMeta.moduleNames) {
      const module = this.modulesMeta.modules[moduleName];
      if (module.info.sync) {
        await this._install(moduleName, module);
      }
    }
  }

  private async _install(moduleName: string, module: IModule) {
    if (!module.__installed__) {
      module.__installed__ = StateLock.create();
    }
    // check
    if (this.modules[moduleName]) {
      await module.__installed__.wait();
      return;
    }
    // record
    this.modules[moduleName] = module;
    // install
    await this._installInner(moduleName, module);
    // installed
    module.__installed__.touch();
    // scope: should after __installed__.touch
    await this.app.bean._getBean(`${moduleName}.scope.module`, false);
  }

  private async _installInner(_moduleName: string, module: IModule) {
    // load
    if (typeof module.resource === 'function') {
      const moduleResource = module.resource as any;
      module.resource = await moduleResource();
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
    // monkey: moduleLoaded
    await this._monkeyModule('moduleLoaded', module);
  }

  private async _registerResources(module: IModule) {
    this._registerLocales(module);
    this._registerErrors(module);
    this._registerConstants(module);
    await this._registerConfig(module);
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
    this.app.constant.modules[relativeName] = this.app.meta.util.extend(
      {},
      module.resource.constants,
      this.app.constant.modules[relativeName],
    );
  }

  private async _registerConfig(module: IModule) {
    if (!module.resource.config) return;
    // config
    const config = await module.resource.config(this.app);
    // monkey
    await this._monkeyModule('configLoaded', module, config);
    // extend
    const relativeName = module.info.relativeName;
    this.app.config.modules[relativeName] = this.app.meta.util.extend(
      {},
      config,
      this.app.config.modules[relativeName],
    );
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
      if (moduleMonkey.info.monkey) {
        if (moduleMonkey.monkeyInstance && moduleMonkey.monkeyInstance[monkeyName]) {
          await this.app.vue.runWithContext(async () => {
            if (moduleTarget === undefined) {
              // @ts-ignore ignore
              await moduleMonkey.monkeyInstance[monkeyName](...monkeyData);
            } else {
              // @ts-ignore ignore
              await moduleMonkey.monkeyInstance[monkeyName](moduleTarget, ...monkeyData);
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
}
