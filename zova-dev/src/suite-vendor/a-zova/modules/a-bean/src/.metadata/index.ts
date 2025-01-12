/** bean: begin */
export * from '../bean/bean.onion.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-a-bean' {
  export interface BeanOnion {
    /** @internal */
    get scope(): ScopeModuleABean;
  }
}
/** bean: end */
/** bean: begin */
import { BeanOnion } from '../bean/bean.onion.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-bean.bean.onion': BeanOnion;
  }
}
/** bean: end */
/** service: begin */
export * from '../bean/service.onion_.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-a-bean' {
  export interface ServiceOnion {
    /** @internal */
    get scope(): ScopeModuleABean;
  }
}
/** service: end */
/** service: begin */
import { ServiceOnion } from '../bean/service.onion_.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-bean.service.onion': ServiceOnion;
  }
}
/** service: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'zova';
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
