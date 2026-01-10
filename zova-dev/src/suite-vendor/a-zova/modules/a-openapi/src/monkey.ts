import type { IModule } from '@cabloy/module-info';
import type { BeanBase, BeanContainer, IMonkeyBeanInit, IMonkeyModule } from 'zova';
import type { ModelSdk } from './model/sdk.js';
import { BeanSimple } from 'zova';

export class Monkey extends BeanSimple implements IMonkeyModule, IMonkeyBeanInit {
  private _moduleSelf: IModule;
  private _modelSdk: ModelSdk;

  constructor(moduleSelf: IModule) {
    super();
    this._moduleSelf = moduleSelf;
  }

  async moduleLoading(_module: IModule) {}
  async moduleLoaded(module: IModule) {
    // self
    if (this._moduleSelf === module) {
      this._modelSdk = await this.app.bean._getBeanSelector('a-openapi.model.sdk', true, this.app.meta.locale.current);
    }
  }

  async beanInit(bean: BeanContainer, beanInstance: BeanBase) {
    const self = this;
    // $api
    bean.defineProperty(beanInstance, '$sdk', {
      enumerable: false,
      configurable: true,
      get() {
        return self._modelSdk;
      },
    });
  }
}
