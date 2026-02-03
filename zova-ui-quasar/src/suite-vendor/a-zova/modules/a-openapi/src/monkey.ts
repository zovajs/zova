import type { IModule } from '@cabloy/module-info';
import type { Ref } from 'vue';
import type { BeanBase, BeanContainer, IMonkeyBeanInit, IMonkeyModule } from 'zova';
import type { ModelSdk } from './model/sdk.js';
import { ref, watch } from 'vue';
import { BeanSimple } from 'zova';

export class Monkey extends BeanSimple implements IMonkeyModule, IMonkeyBeanInit {
  private _moduleSelf: IModule;
  private _modelSdk: Ref<ModelSdk | undefined> = ref();

  constructor(moduleSelf: IModule) {
    super();
    this._moduleSelf = moduleSelf;
  }

  async moduleLoading(_module: IModule) {}
  async moduleLoaded(module: IModule) {
    // self
    if (this._moduleSelf === module) {
      await this._loadSdk();
      this.ctx.util.instanceScope(() => {
        return watch(() => {
          return this.app.meta.locale.current;
        }, async () => {
          await this._loadSdk();
        });
      });
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

  private async _loadSdk() {
    this._modelSdk.value = await this.app.bean._getBeanSelector('a-openapi.model.sdk', true, this.app.meta.locale.current);
  }
}
