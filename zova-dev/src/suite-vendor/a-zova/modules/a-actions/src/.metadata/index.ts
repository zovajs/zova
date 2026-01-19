/* eslint-disable */
/** action: begin */
export * from '../bean/action.var.jsx';
import { IActionOptionsVar } from '../bean/action.var.jsx';
import 'zova-module-a-action';
declare module 'zova-module-a-action' {
  
    export interface IActionRecord {
      'a-actions:var': IActionOptionsVar;
    }

  
}
declare module 'zova-module-a-actions' {
  
        export interface ActionVar {
          /** @internal */
          get scope(): ScopeModuleAActions;
        }

        export interface ActionVar {
          get $beanFullName(): 'a-actions.action.var';
          get $onionName(): 'a-actions:var';
          get $onionOptions(): IActionOptionsVar;
        } 
}
/** action: end */
/** action: begin */
import { ActionVar } from '../bean/action.var.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-actions.action.var': ActionVar;
  }
}
/** action: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleAActions extends BeanScopeBase {}

export interface ScopeModuleAActions {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-actions': ScopeModuleAActions;
  }
  
  

  

  
}
  
/** scope: end */
