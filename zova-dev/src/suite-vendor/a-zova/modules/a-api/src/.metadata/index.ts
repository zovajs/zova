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
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** monkey: begin */
export * from '../monkey.js';
/** monkey: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleAApi extends BeanScopeBase {}

export interface ScopeModuleAApi extends TypeModuleResource<typeof config, never, never, never, never> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-api': ScopeModuleAApi;
  }

  export interface IBeanScopeConfig {
    'a-api': ReturnType<typeof config>;
  }
}
/** scope: end */
/** scope module: begin */

declare module 'zova-module-a-api' {}
/** scope module: end */
