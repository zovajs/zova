import type { BeanScopeUtil } from 'zova';
/** service: end */
/** scope: begin */
import { BeanScopeBase } from 'zova';
/** sys: end */
/** sys: begin */
import { SysOnion } from '../bean/sys.onion.js';

import { Scope } from '../lib/scope.js';
/** service: end */
/** service: begin */
import { ServiceAop } from '../service/aop.js';
/** sys: begin */
import 'zova';
import 'zova';
import 'zova';
import 'zova';

import 'zova';

export * from '../bean/sys.onion.js';
declare module 'zova' {

}
declare module 'zova-module-a-bean' {

  export interface SysOnion {
    /** @internal */
    get scope(): ScopeModuleABean;
  }
}
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-bean.sys.onion': SysOnion;
  }
}
/** sys: end */
/** service: begin */
export * from '../service/aop.js';
export * from '../service/onion_.js';
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
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-bean.service.aop': ServiceAop;
  }
}

@Scope()
export class ScopeModuleABean extends BeanScopeBase {}

export interface ScopeModuleABean {
  util: BeanScopeUtil;
}

declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-bean': ScopeModuleABean;
  }

}

/** scope: end */
