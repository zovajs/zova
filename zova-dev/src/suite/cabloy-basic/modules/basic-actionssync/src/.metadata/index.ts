// eslint-disable
/** action: begin */
export * from '../bean/action.log.jsx';
import { IActionOptionsLog } from '../bean/action.log.jsx';
import 'zova-module-a-action';
declare module 'zova-module-a-action' {
  
    export interface IActionRecord {
      'basic-actionssync:log': IActionOptionsLog;
    }

  
}
declare module 'zova-module-basic-actionssync' {
  
        export interface ActionLog {
          /** @internal */
          get scope(): ScopeModuleBasicActionssync;
        }

        export interface ActionLog {
          get $beanFullName(): 'basic-actionssync.action.log';
          get $onionName(): 'basic-actionssync:log';
          get $onionOptions(): IActionOptionsLog;
        } 
}
/** action: end */
/** action: begin */
import { ActionLog } from '../bean/action.log.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'basic-actionssync.action.log': ActionLog;
  }
}
/** action: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleBasicActionssync extends BeanScopeBase {}

export interface ScopeModuleBasicActionssync {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'basic-actionssync': ScopeModuleBasicActionssync;
  }
  
  

  

  
}
  
/** scope: end */
