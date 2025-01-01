import { BeanBase, TypeEventOff, Virtual } from 'zova';
import { BeanRouter } from './bean.router.js';

@Virtual()
export class BeanRouterBase extends BeanBase {
  private _eventRouterGuards: TypeEventOff;

  protected async __init__() {
    this._eventRouterGuards = this.app.meta.event.on('a-router:routerGuards', async (data, next) => {
      this.onRouterGuards(data);
      return await next();
    });
  }

  protected __dispose__() {
    if (this._eventRouterGuards) {
      this._eventRouterGuards();
    }
  }

  protected onRouterGuards(_router: BeanRouter) {}
}
