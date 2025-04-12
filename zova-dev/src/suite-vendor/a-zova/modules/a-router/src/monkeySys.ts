import type { IModule } from '@cabloy/module-info';
import type { IMonkeyModuleSys } from 'zova';
import type { SysRouter } from './bean/sys.router.js';
import { BeanSimple } from 'zova';

export class MonkeySys extends BeanSimple implements IMonkeyModuleSys {
  private _moduleSelf: IModule;
  private _sysRouter: SysRouter;

  constructor(moduleSelf: IModule) {
    super();
    this._moduleSelf = moduleSelf;
  }

  async getSysRouter() {
    if (!this._sysRouter) {
      this._sysRouter = (await this.bean._getBean('a-router.sys.router', false)) as SysRouter;
    }
    return this._sysRouter;
  }

  async moduleLoading(module: IModule) {
    if (this._moduleSelf === module) return;
    const sysRouter = await this.getSysRouter();
    sysRouter._registerRoutes(module);
  }

  async moduleLoaded(_module: IModule) {}
  async configLoaded(_module: IModule, _config) {}
}
