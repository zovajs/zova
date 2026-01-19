/* eslint-disable */
/** action: begin */
export * from '../bean/action.view.jsx';
import { IActionOptionsView } from '../bean/action.view.jsx';
import 'zova-module-a-action';
declare module 'zova-module-a-action' {
  
    export interface IActionRecord {
      'devui-actions:view': IActionOptionsView;
    }

  
}
declare module 'zova-module-devui-actions' {
  
        export interface ActionView {
          /** @internal */
          get scope(): ScopeModuleDevuiActions;
        }

        export interface ActionView {
          get $beanFullName(): 'devui-actions.action.view';
          get $onionName(): 'devui-actions:view';
          get $onionOptions(): IActionOptionsView;
        } 
}
/** action: end */
/** action: begin */
import { ActionView } from '../bean/action.view.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'devui-actions.action.view': ActionView;
  }
}
/** action: end */
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
