import type { NavigationGuardWithThis, Router } from '@cabloy/vue-router';
import { BeanBase, TypeEventOff, Use } from 'zova';
import { Bean } from 'zova-module-a-bean';
import { ModelPageRoute } from '../model/pageRoute.js';
import { SysRouter } from './sys.router.js';

export interface BeanRouter extends Omit<SysRouter, '$beanFullName' | '$onionName' | '$onionOptions'> {}

@Bean()
export class BeanRouter extends BeanBase {
  private _vueRouterApp: Router;
  private _eventRouterGuards: TypeEventOff[] = [];

  @Use()
  $$sysRouter: SysRouter;

  @Use()
  $$modelPageRoute: ModelPageRoute;

  get router(): Router {
    return this._vueRouterApp;
  }

  protected __dispose__() {
    for (const fn of this._eventRouterGuards) {
      fn();
    }
  }

  protected __get__(prop: string) {
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

  beforeEach(guard: NavigationGuardWithThis<undefined>): () => void {
    const fn = this._vueRouterApp.beforeEach(guard);
    this._eventRouterGuards.push(fn);
    return fn;
  }
}
