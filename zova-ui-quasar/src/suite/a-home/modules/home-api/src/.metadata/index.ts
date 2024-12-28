/** beans: begin */
export * from '../bean/bean.bean.js';
import { BeanBean } from '../bean/bean.bean.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'home-api.bean.bean': BeanBean;
  }
}
/** beans: end */
/** service: begin */
export * from '../service/example.js';
import { ServiceExample } from '../service/example.js';
export interface IModuleService {
  example: ServiceExample;
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
