/** interceptor: begin */
export * from '../bean/interceptor.body.js';
export * from '../bean/interceptor.jwt.js';
import { IInterceptorOptionsBody } from '../bean/interceptor.body.js';
import { IInterceptorOptionsJwt } from '../bean/interceptor.jwt.js';
import 'zova';
declare module 'zova-module-a-fetch' {
  export interface IInterceptorRecord {
    'a-interceptor:body': IInterceptorOptionsBody;
    'a-interceptor:jwt': IInterceptorOptionsJwt;
  }
}
declare module 'zova-module-a-interceptor' {
  export interface InterceptorBody {
    /** @internal */
    get scope(): ScopeModuleAInterceptor;
  }

  export interface InterceptorJwt {
    /** @internal */
    get scope(): ScopeModuleAInterceptor;
  }
}
/** interceptor: end */
/** interceptor: begin */
import { InterceptorBody } from '../bean/interceptor.body.js';
import { InterceptorJwt } from '../bean/interceptor.jwt.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'a-interceptor.interceptor.body': InterceptorBody;
    'a-interceptor.interceptor.jwt': InterceptorJwt;
  }
}
/** interceptor: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleAInterceptor extends BeanScopeBase {}

export interface ScopeModuleAInterceptor {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-interceptor': ScopeModuleAInterceptor;
  }
}

/** scope: end */
