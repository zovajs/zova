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
/** service: begin */
export * from '../service/composer.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-a-fetch' {
  export interface ServiceComposer {
    /** @internal */
    get scope(): ScopeModuleAFetch;
  }
}
/** service: end */
/** service: begin */
import { ServiceComposer } from '../service/composer.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-fetch.service.composer': ServiceComposer;
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
export class ScopeModuleAFetch extends BeanScopeBase {}

export interface ScopeModuleAFetch {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-fetch': ScopeModuleAFetch;
  }

  export interface IBeanScopeConfig {
    'a-fetch': ReturnType<typeof config>;
  }
}

/** scope: end */
