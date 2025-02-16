import type { IModule } from '@cabloy/module-info';
import type {
  BeanBase,
  BeanContainer,
  IBeanScopeRecord,
  IMonkeyBeanInit,
  IMonkeyModule,
} from 'zova';
import type { ScopeModule } from './.metadata/this.js';
import {
  appResource,
  BeanSimple,
  cast,
} from 'zova';
import { __ThisModule__ } from './.metadata/this.js';

export class Monkey extends BeanSimple implements IMonkeyModule, IMonkeyBeanInit {
  private _moduleSelf: IModule;
  private _defaultModuleApi: keyof IBeanScopeRecord;

  constructor(moduleSelf: IModule) {
    super();
    this._moduleSelf = moduleSelf;
  }

  async moduleLoading(_module: IModule) {}
  async moduleLoaded(module: IModule) {
    // load apis
    const onions = appResource.scenes.api?.[module.info.relativeName];
    if (onions) {
      const scope = this.bean.scope(module.info.relativeName) as any;
      for (const beanFullName in onions) {
        const beanOptions = onions[beanFullName];
        scope.api[beanOptions.name] = await this.bean._getBean(beanFullName as any, true);
      }
    }
    // self
    if (this._moduleSelf === module) {
      const scopeSelf: ScopeModule = await this.bean.getScope(__ThisModule__);
      this._defaultModuleApi = scopeSelf.config.defaultModuleApi;
      await this.app.meta.module.use(this._defaultModuleApi);
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
        return cast(self.app.bean.scope(self._defaultModuleApi)).api;
      },
    });
  }
}
