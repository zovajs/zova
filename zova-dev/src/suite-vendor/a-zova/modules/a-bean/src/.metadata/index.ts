/** service: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'zova';
/** bean: end */
/** bean: begin */
import { BeanOnion } from '../bean/bean.onion.js';
import { Scope } from '../lib/scope.js';

/** service: end */
/** service: begin */
import { ServiceAop } from '../service/aop.js';
/** bean: begin */
import 'zova';
import 'zova';
import 'zova';
import 'zova';

import 'zova';

export * from '../bean/bean.onion.js';
declare module 'zova' {

}
declare module 'zova-module-a-bean' {

  export interface BeanOnion {
    /** @internal */
    get scope(): ScopeModuleABean;
  }
}
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-bean.bean.onion': BeanOnion;
  }
}
/** bean: end */
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
