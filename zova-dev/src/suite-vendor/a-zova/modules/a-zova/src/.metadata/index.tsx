/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleAZova extends BeanScopeBase {}

export interface ScopeModuleAZova extends TypeModuleResource<never, never, never, never, never> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-zova': ScopeModuleAZova;
  }
}
/** scope: end */
/** scope module: begin */

declare module 'zova-module-a-zova' {}
/** scope module: end */
