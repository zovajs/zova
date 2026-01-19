/* eslint-disable */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleDevuiActions extends BeanScopeBase {}

export interface ScopeModuleDevuiActions {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'devui-actions': ScopeModuleDevuiActions;
  }
  
  

  

  
}
  
/** scope: end */
