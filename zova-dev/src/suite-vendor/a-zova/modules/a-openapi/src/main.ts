import type { IModuleMain } from 'zova';
// import type { ModelSdk } from './model/sdk.js';
import { BeanSimple } from 'zova';

export class Main extends BeanSimple implements IModuleMain {
  // private _modelSdk: ModelSdk;

  async moduleLoading() {}
  async moduleLoaded() {
    // this._modelSdk = await this.app.bean._getBeanSelector('a-openapi.model.sdk', true, this.app.meta.locale.current);
  }
}
