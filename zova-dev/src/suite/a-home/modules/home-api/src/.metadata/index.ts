/** beans: begin */
export * from '../bean/bean.api.js';
import { BeanApi } from '../bean/bean.api.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'home-api.bean.api': BeanApi;
  }
}
/** beans: end */
/** service: begin */
export * from '../service/openapi/index.js';
export * from '../service/home.js';
export * from '../service/onion.js';
import { ServiceHome } from '../service/home.js';
import { ServiceOnion } from '../service/onion.js';
export interface IModuleService {
  home: ServiceHome;
  onion: ServiceOnion;
}
/** service: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'zova';
import { Scope } from 'zova';

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
/** scope module: begin */
export * from '../bean/bean.api.js';
export * from '../service/home.js';
export * from '../service/onion.js';
declare module 'zova-module-home-api' {
  export interface BeanApi {
    /** @internal */
    get scope(): ScopeModuleHomeApi;
  }

  export interface ServiceHome {
    /** @internal */
    get scope(): ScopeModuleHomeApi;
  }

  export interface ServiceOnion {
    /** @internal */
    get scope(): ScopeModuleHomeApi;
  }
}
/** scope module: end */
