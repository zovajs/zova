import type { Router } from 'vue-router';
import { BeanBase, Use } from 'zova';
import { Bean } from 'zova-module-a-bean';
import { SysRouter } from 'zova-module-a-router';

const SymbolRouter = Symbol('SymbolRouter');

export interface BeanRouter extends Router {}

@Bean()
export class BeanRouter extends BeanBase {
  [SymbolRouter]: Router;

  @Use()
  $$sysRouter: SysRouter;

  get router(): Router {
    return this[SymbolRouter];
  }

  protected __get__(prop) {
    return this[SymbolRouter] && this[SymbolRouter][prop];
  }

  protected async __init__(mainRouter?: boolean) {
    // create router
    this[SymbolRouter] = this.$$sysRouter.createRouter();
    if (!mainRouter) {
      // emit event
      await this.app.meta.event.emit('a-router:routerGuards', this);
    }
  }
}
