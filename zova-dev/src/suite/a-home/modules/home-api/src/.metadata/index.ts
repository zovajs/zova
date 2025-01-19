/** api: begin */
export * from '../api/home.js';
export * from '../api/onion.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-home-api' {
  export interface ApiHome {
    /** @internal */
    get scope(): ScopeModuleHomeApi;
  }

  export interface ApiOnion {
    /** @internal */
    get scope(): ScopeModuleHomeApi;
  }
}
/** api: end */
/** api: begin */
import { ApiHome } from '../api/home.js';
import { ApiOnion } from '../api/onion.js';
export interface IModuleApi {
  home: ApiHome;
  onion: ApiOnion;
}
/** api: end */
/** api: begin */

import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'home-api.api.home': ApiHome;
    'home-api.api.onion': ApiOnion;
  }
}
/** api: end */
/** openapi: begin */
export * from '../api/openapi/index.js';
/** openapi: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleHomeApi extends BeanScopeBase {}

export interface ScopeModuleHomeApi {
  util: BeanScopeUtil;
  api: IModuleApi;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'home-api': ScopeModuleHomeApi;
  }
}

/** scope: end */
