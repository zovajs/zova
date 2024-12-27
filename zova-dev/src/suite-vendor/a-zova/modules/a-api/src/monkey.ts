import {
  appResource,
  BeanBase,
  BeanContainer,
  BeanSimple,
  IModule,
  IMonkeyAppInitialize,
  IMonkeyBeanInit,
  IMonkeyModule,
} from 'zova';
import { __ThisModule__, ScopeModule } from './.metadata/this.js';

export class Monkey extends BeanSimple implements IMonkeyAppInitialize, IMonkeyModule, IMonkeyBeanInit {
  private _moduleSelf: IModule;
  private _defaultModuleService: string;

  constructor(moduleSelf: IModule) {
    super();
    this._moduleSelf = moduleSelf;
  }

  async appInitialize() {
    // api
    const scopeSelf: ScopeModule = await this.bean.getScope(__ThisModule__);
    this.app.meta.$api = await this.bean._getBean(scopeSelf.config.defaultBeanApi, false);
  }

  async moduleLoading(_module: IModule) {}
  async moduleLoaded(module: IModule) {
    // load services
    const onions = appResource.scenes['service']?.[module.info.relativeName];
    if (onions) {
      const scope = this.bean.scope(module.info.relativeName) as any;
      scope.service = {};
      for (const beanFullName in onions) {
        const beanOptions = onions[beanFullName];
        scope.service[beanOptions.name] = await this.bean._getBean(beanFullName as any, true);
      }
    }
    // self
    if (this._moduleSelf === module) {
      const scopeSelf: ScopeModule = await this.bean.getScope(__ThisModule__);
      this._defaultModuleService = scopeSelf.config.defaultModuleServices;
      await this.app.meta.module.use(this._defaultModuleService);
    }
  }
  async configLoaded(_module: IModule, _config) {}

  async beanInit(bean: BeanContainer, beanInstance: BeanBase) {
    const self = this;
    // $api
    bean.defineProperty(beanInstance, '$api', {
      enumerable: false,
      configurable: true,
      get() {
        return self.app.meta.$api;
      },
    });
    // $service
    bean.defineProperty(beanInstance, '$service', {
      enumerable: false,
      configurable: true,
      get() {
        return self.app.bean.scope(this._defaultModuleService).service;
      },
    });
  }
}
