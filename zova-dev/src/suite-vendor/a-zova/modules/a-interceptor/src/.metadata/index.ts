/** config: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil, TypeModuleConfig } from 'zova';
import { Scope } from 'zova-module-a-bean';
/** interceptor: begin */
import { IInterceptorOptionsBody } from '../bean/interceptor.body.js';
/** interceptor: end */
/** interceptor: begin */
import { InterceptorBody } from '../bean/interceptor.body.js';
import { IInterceptorOptionsJwt } from '../bean/interceptor.jwt.js';
import { InterceptorJwt } from '../bean/interceptor.jwt.js';
import { config } from '../config/config.js';
import 'zova';
import 'zova';

import 'zova';

export * from '../bean/interceptor.body.js';
export * from '../bean/interceptor.jwt.js';
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
declare module 'zova' {
  export interface IBeanRecordLocal {
    'a-interceptor.interceptor.body': InterceptorBody;
    'a-interceptor.interceptor.jwt': InterceptorJwt;
  }
}
/** interceptor: end */
/** config: begin */
export * from '../config/config.js';

@Scope()
export class ScopeModuleAInterceptor extends BeanScopeBase {}

export interface ScopeModuleAInterceptor {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
}
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-interceptor': ScopeModuleAInterceptor;
  }

  export interface IBeanScopeConfig {
    'a-interceptor': ReturnType<typeof config>;
  }
}

/** scope: end */
