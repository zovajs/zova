/** beans: begin */
export * from '../bean/bean.router.js';
export * from '../bean/bean.routerBase.js';
import { BeanRouter } from '../bean/bean.router.js';
import { BeanRouterBase } from '../bean/bean.routerBase.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'a-router.bean.router': BeanRouter;
    'a-router.bean.routerBase': BeanRouterBase;
  }
}
/** beans: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** monkey: begin */
export * from '../monkey.js';
/** monkey: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil, TypeModuleConfig } from 'zova';
import { Scope } from 'zova';

@Scope()
export class ScopeModuleARouter extends BeanScopeBase {}

export interface ScopeModuleARouter {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-router': ScopeModuleARouter;
  }

  export interface IBeanScopeConfig {
    'a-router': ReturnType<typeof config>;
  }
}

/** scope: end */
/** scope module: begin */
export * from '../bean/bean.router.js';
export * from '../bean/local.router.js';
declare module 'zova-module-a-router' {
  export interface BeanRouter {
    /** @internal */
    get scope(): ScopeModuleARouter;
  }

  export interface LocalRouter {
    /** @internal */
    get scope(): ScopeModuleARouter;
  }
}
/** scope module: end */
