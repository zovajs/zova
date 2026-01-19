/* eslint-disable */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleAAction extends BeanScopeBase {}

export interface ScopeModuleAAction {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-action': ScopeModuleAAction;
  }
  
  

  

  
}
  
/** scope: end */
