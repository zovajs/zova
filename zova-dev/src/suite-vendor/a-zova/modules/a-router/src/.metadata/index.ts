import type { BeanScopeUtil } from 'zova';
/** monkey: end */
/** scope: begin */
import { BeanScopeBase, TypeModuleConfig } from 'zova';
import { Scope } from 'zova-module-a-bean';
/** bean: end */
/** bean: begin */
import { BeanRouter } from '../bean/bean.router.js';

import { BeanRouterBase } from '../bean/bean.routerBase.js';
import { config } from '../config/config.js';
/** service: end */
/** service: begin */
import { ServiceRouter } from '../service/router.js';
/** bean: begin */
import 'zova';
import 'zova';
import 'zova';
import 'zova';

import 'zova';

export * from '../bean/bean.router.js';
export * from '../bean/bean.routerBase.js';
declare module 'zova' {

}
declare module 'zova-module-a-router' {

  export interface BeanRouter {
    /** @internal */
    get scope(): ScopeModuleARouter;
  }
}
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-router.bean.router': BeanRouter;
    'a-router.bean.routerBase': BeanRouterBase;
  }
}
/** service: end */
/** config: begin */
export * from '../config/config.js';
declare module 'zova-module-a-bean' {

  export interface IServiceRecord {
    'a-router:router': never;
  }

}
declare module 'zova-module-a-router' {

  export interface ServiceRouter {
    /** @internal */
    get scope(): ScopeModuleARouter;
  }
}
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-router.service.router': ServiceRouter;
  }
}
/** config: end */
/** monkey: begin */
export * from '../monkey.js';
/** bean: end */
/** service: begin */
export * from '../service/router.js';

@Scope()
export class ScopeModuleARouter extends BeanScopeBase {}

export interface ScopeModuleARouter {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
}

declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-router': ScopeModuleARouter;
  }

  export interface IBeanScopeConfig {
    'a-router': ReturnType<typeof config>;
  }

}

/** scope: end */
