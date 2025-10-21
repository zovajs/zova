/* eslint-disable */
/** sys: begin */
export * from '../bean/sys.router.js';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-a-router' {
  
        export interface SysRouter {
          /** @internal */
          get scope(): ScopeModuleARouter;
        } 
}
/** sys: end */
/** sys: begin */
import { SysRouter } from '../bean/sys.router.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-router.sys.router': SysRouter;
  }
}
/** sys: end */
/** bean: begin */
export * from '../bean/bean.router.js';
export * from '../bean/bean.routerBase.js';

import 'zova';
declare module 'zova' {
  
  
}
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

import 'zova-module-a-bean';
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
/** model: begin */
export * from '../model/pageRoute.js';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-a-router' {
  
        export interface ModelPageRoute {
          /** @internal */
          get scope(): ScopeModuleARouter;
        } 
}
/** model: end */
/** model: begin */
import { ModelPageRoute } from '../model/pageRoute.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-router.model.pageRoute': ModelPageRoute;
  }
}
/** model: end */
/** monkey: begin */
export * from '../monkey.js';
/** monkey: end */
/** monkeySys: begin */
export * from '../monkeySys.js';
/** monkeySys: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleARouter extends BeanScopeBase {}

export interface ScopeModuleARouter {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-router': ScopeModuleARouter;
  }
  
  

  

  
}
  
/** scope: end */
