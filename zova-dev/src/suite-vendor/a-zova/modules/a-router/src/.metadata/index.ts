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
/** service: begin */
export * from '../service/router.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-a-router' {
  export interface ServiceRouter {
    /** @internal */
    get scope(): ScopeModuleARouter;
  }
}
/** service: end */
/** service: begin */
import { ServiceRouter } from '../service/router.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-router.service.router': ServiceRouter;
  }
}
/** service: end */
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
