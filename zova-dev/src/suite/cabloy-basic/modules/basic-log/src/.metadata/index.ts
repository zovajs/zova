// eslint-disable
/** action: begin */
export * from '../bean/action.log.jsx';
import { IActionOptionsLog } from '../bean/action.log.jsx';
import 'zova-module-a-action';
declare module 'zova-module-a-action' {
  
    export interface IActionRecord {
      'basic-log:log': IActionOptionsLog;
    }

  
}
declare module 'zova-module-basic-log' {
  
        export interface ActionLog {
          /** @internal */
          get scope(): ScopeModuleBasicLog;
        }

        export interface ActionLog {
          get $beanFullName(): 'basic-log.action.log';
          get $onionName(): 'basic-log:log';
          get $onionOptions(): IActionOptionsLog;
        } 
}
/** action: end */
/** action: begin */
import { ActionLog } from '../bean/action.log.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'basic-log.action.log': ActionLog;
  }
}
/** action: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleBasicLog extends BeanScopeBase {}

export interface ScopeModuleBasicLog {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'basic-log': ScopeModuleBasicLog;
  }
  
  

  

  
}
  
/** scope: end */
