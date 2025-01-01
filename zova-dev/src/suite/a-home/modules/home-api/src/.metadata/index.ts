/** beans: begin */
export * from '../bean/bean.api.js';
import { BeanApi } from '../bean/bean.api.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'home-api.bean.api': BeanApi;
  }
}
declare module 'zova-module-home-api' {
  export interface BeanApi {
    /** @internal */
    get scope(): ScopeModuleHomeApi;
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
import { BeanScopeBase, Scope, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleHomeApi extends BeanScopeBase {}

export interface ScopeModuleHomeApi extends TypeModuleResource<never, never, never, never, IModuleService> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'home-api': ScopeModuleHomeApi;
  }
}
/** scope: end */
