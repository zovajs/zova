/** service: begin */
export * from '../service/home.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-home-api' {
  export interface ServiceHome {
    /** @internal */
    get scope(): ScopeModuleHomeApi;
  }
}
/** service: end */
/** service: begin */
import { ServiceHome } from '../service/home.js';
export interface IModuleService {
  home: ServiceHome;
}
/** service: end */
/** service: begin */

import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'home-api.service.home': ServiceHome;
  }
}
/** service: end */
/** openapi: begin */
export * from '../service/openapi/index.js';
/** openapi: end */
/** bean: begin */
export * from '../bean/bean.api.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-home-api' {
  export interface BeanApi {
    /** @internal */
    get scope(): ScopeModuleHomeApi;
  }
}
/** bean: end */
/** bean: begin */
import { BeanApi } from '../bean/bean.api.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'home-api.bean.api': BeanApi;
  }
}
/** bean: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleHomeApi extends BeanScopeBase {}

export interface ScopeModuleHomeApi {
  util: BeanScopeUtil;
  service: IModuleService;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'home-api': ScopeModuleHomeApi;
  }
}

/** scope: end */
