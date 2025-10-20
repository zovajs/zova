/* eslint-disable */
/** sys: begin */
export * from '../bean/sys.onion.js';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-a-bean' {
  
        export interface SysOnion {
          /** @internal */
          get scope(): ScopeModuleABean;
        } 
}
/** sys: end */
/** sys: begin */
import { SysOnion } from '../bean/sys.onion.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-bean.sys.onion': SysOnion;
  }
}
/** sys: end */
/** service: begin */
export * from '../service/aop.js';
export * from '../service/onion_.js';

import 'zova';
declare module 'zova-module-a-bean' {
  
    export interface IServiceRecord {
      'a-bean:aop': never;
    }

  
}
declare module 'zova-module-a-bean' {
  
        export interface ServiceAop {
          /** @internal */
          get scope(): ScopeModuleABean;
        } 
}
/** service: end */
/** service: begin */
import { ServiceAop } from '../service/aop.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-bean.service.aop': ServiceAop;
  }
}
/** service: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from '../lib/scope.js';

@Scope()
export class ScopeModuleABean extends BeanScopeBase {}

export interface ScopeModuleABean {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-bean': ScopeModuleABean;
  }
  
  

  

  
}
  
/** scope: end */
