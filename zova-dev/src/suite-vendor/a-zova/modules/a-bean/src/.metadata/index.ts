/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'zova';
import { Scope } from '../lib/scope.js';

@Scope()
export class ScopeModuleABean extends BeanScopeBase {}

export interface ScopeModuleABean {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-bean': ScopeModuleABean;
  }
}

/** scope: end */
/** scope module: begin */

declare module 'zova-module-a-bean' {}
/** scope module: end */
