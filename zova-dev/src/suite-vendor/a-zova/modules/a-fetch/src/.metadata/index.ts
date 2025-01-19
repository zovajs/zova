/** interceptor: begin */
export * from '../bean/interceptor.body.js';
import { IInterceptorOptionsBody } from '../bean/interceptor.body.js';
import 'zova';
declare module 'zova-module-a-fetch' {
  export interface IInterceptorRecord {
    'a-fetch:body': IInterceptorOptionsBody;
  }
}
declare module 'zova-module-a-fetch' {
  export interface InterceptorBody {
    /** @internal */
    get scope(): ScopeModuleAFetch;
  }
}
/** interceptor: end */
/** interceptor: begin */
import { InterceptorBody } from '../bean/interceptor.body.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'a-fetch.interceptor.body': InterceptorBody;
  }
}
/** interceptor: end */
/** bean: begin */
export * from '../bean/bean.fetch.js';
export * from '../bean/bean.interceptorBase.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-a-fetch' {
  export interface BeanFetch {
    /** @internal */
    get scope(): ScopeModuleAFetch;
  }
}
/** bean: end */
/** bean: begin */
import { BeanFetch } from '../bean/bean.fetch.js';
import { BeanInterceptorBase } from '../bean/bean.interceptorBase.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-fetch.bean.fetch': BeanFetch;
    'a-fetch.bean.interceptorBase': BeanInterceptorBase;
  }
}
/** bean: end */
/** monkey: begin */
export * from '../monkey.js';
/** monkey: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleAFetch extends BeanScopeBase {}

export interface ScopeModuleAFetch {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-fetch': ScopeModuleAFetch;
  }
}

/** scope: end */
