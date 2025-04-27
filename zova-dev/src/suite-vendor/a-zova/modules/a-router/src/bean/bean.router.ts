import type { Router } from '@cabloy/vue-router';
import { BeanBase, Use } from 'zova';
import { Bean } from 'zova-module-a-bean';
import { SysRouter } from './sys.router.js';

export interface BeanRouter extends SysRouter {}

@Bean()
export class BeanRouter extends BeanBase {
  private _vueRouterApp: Router;

  @Use()
  $$sysRouter: SysRouter;

  get router(): Router {
    return this._vueRouterApp;
  }

  protected __get__(prop) {
    // SymbolRouter first
    const value = this._vueRouterApp?.[prop];
    if (value !== undefined) return value;
    return this.$$sysRouter?.[prop];
  }

  protected async __init__(mainRouter?: boolean) {
    // create router
    this._vueRouterApp = this.$$sysRouter.createRouter();
    if (!mainRouter) {
      // emit event
      await this.app.meta.event.emit('a-router:routerGuards', this);
    }
  }
}
