import { BeanSimple, IModuleMain } from 'zova';
import { BeanOnion } from 'zova-module-a-bean';

export class Main extends BeanSimple implements IModuleMain {
  protected _beanOnion: BeanOnion;

  async moduleLoading() {}
  async moduleLoaded() {
    // onion
    this._beanOnion = await this.app.bean._getBean(BeanOnion, false);
  }
  async configLoaded(_config: any) {}
}
