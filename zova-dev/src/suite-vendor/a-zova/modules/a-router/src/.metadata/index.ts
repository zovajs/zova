/** bean: begin */
export * from '../bean/bean.router.js';
export * from '../bean/bean.routerBase.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-a-router' {
  export interface BeanRouter {
    /** @internal */
    get scope(): ScopeModuleARouter;
  }
}
/** bean: end */
/** bean: begin */
import { BeanRouter } from '../bean/bean.router.js';
import { BeanRouterBase } from '../bean/bean.routerBase.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-router.bean.router': BeanRouter;
    'a-router.bean.routerBase': BeanRouterBase;
  }
}
/** bean: end */
/** local: begin */
export * from '../bean/local.router.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-a-router' {
  export interface LocalRouter {
    /** @internal */
    get scope(): ScopeModuleARouter;
  }
}
/** local: end */
/** local: begin */
import { LocalRouter } from '../bean/local.router.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'a-router.local.router': LocalRouter;
  }
}
/** local: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** monkey: begin */
export * from '../monkey.js';
/** monkey: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil, TypeModuleConfig } from 'zova';
import { Scope } from 'zova-module-a-bean';

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
