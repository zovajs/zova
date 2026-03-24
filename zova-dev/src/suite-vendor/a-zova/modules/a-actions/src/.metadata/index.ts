// eslint-disable
/** action: begin */
export * from '../bean/action.log.jsx';
import { IActionOptionsLog } from '../bean/action.log.jsx';
import 'zova-module-a-action';
declare module 'zova-module-a-action' {
  
    export interface IActionRecord {
      'a-actions:log': IActionOptionsLog;
    }

  
}
declare module 'zova-module-a-actions' {
  
        export interface ActionLog {
          /** @internal */
          get scope(): ScopeModuleAActions;
        }

        export interface ActionLog {
          get $beanFullName(): 'a-actions.action.log';
          get $onionName(): 'a-actions:log';
          get $onionOptions(): IActionOptionsLog;
        } 
}
/** action: end */
/** action: begin */
import { ActionLog } from '../bean/action.log.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-actions.action.log': ActionLog;
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
