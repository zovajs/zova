/** beans: begin */
export * from '../bean/bean.serviceBase.js';
import { BeanServiceBase } from '../bean/bean.serviceBase.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'a-api.bean.serviceBase': BeanServiceBase;
  }
}
/** beans: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleAApi extends BeanScopeBase {}

export interface ScopeModuleAApi extends TypeModuleResource<never, never, never, never, never> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-api': ScopeModuleAApi;
  }
}
/** scope: end */
