import type { IModule } from '@cabloy/module-info';
import type { IMonkeyModuleSys } from 'zova';
import { BeanSimple } from 'zova';

export class MonkeySys extends BeanSimple implements IMonkeyModuleSys {
  private _moduleSelf: IModule;
  private _beanRouter: BeanRouter;

  constructor(moduleSelf: IModule) {
    super();
    this._moduleSelf = moduleSelf;
  }

  async getBeanRouter() {
    if (!this._beanRouter) {
      this._beanRouter = (await this.bean._getBean('a-router.bean.router', false, true)) as BeanRouter;
    }
    return this._beanRouter;
  }

  async moduleLoading(module: IModule) {
    if (this._moduleSelf === module) return;
    const beanRouter = await this.getBeanRouter();
    beanRouter._registerRoutes(module);
  }

  async moduleLoaded(_module: IModule) {}
  async configLoaded(_module: IModule, _config) {}
}
