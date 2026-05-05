// eslint-disable
/** action: begin */
export * from '../bean/action.alert.jsx';
export * from '../bean/action.confirm.jsx';
export * from '../bean/action.copy.jsx';
export * from '../bean/action.create.jsx';
export * from '../bean/action.delete.jsx';
export * from '../bean/action.edit.jsx';
export * from '../bean/action.setValue.jsx';
export * from '../bean/action.view.jsx';
import { IActionOptionsAlert } from '../bean/action.alert.jsx';
import { IActionOptionsConfirm } from '../bean/action.confirm.jsx';
import { IActionOptionsCopy } from '../bean/action.copy.jsx';
import { IActionOptionsCreate } from '../bean/action.create.jsx';
import { IActionOptionsDelete } from '../bean/action.delete.jsx';
import { IActionOptionsEdit } from '../bean/action.edit.jsx';
import { IActionOptionsSetValue } from '../bean/action.setValue.jsx';
import { IActionOptionsView } from '../bean/action.view.jsx';
import 'zova-module-a-action';
declare module 'zova-module-a-action' {
  
    export interface IActionRecord {
      'rest-actions:alert': IActionOptionsAlert;
'rest-actions:confirm': IActionOptionsConfirm;
'rest-actions:copy': IActionOptionsCopy;
'rest-actions:create': IActionOptionsCreate;
'rest-actions:delete': IActionOptionsDelete;
'rest-actions:edit': IActionOptionsEdit;
'rest-actions:setValue': IActionOptionsSetValue;
'rest-actions:view': IActionOptionsView;
    }

  
}
declare module 'zova-module-rest-actions' {
  
        export interface ActionAlert {
          /** @internal */
          get scope(): ScopeModuleRestActions;
        }

        export interface ActionAlert {
          get $beanFullName(): 'rest-actions.action.alert';
          get $onionName(): 'rest-actions:alert';
          get $onionOptions(): IActionOptionsAlert;
        }

        export interface ActionConfirm {
          /** @internal */
          get scope(): ScopeModuleRestActions;
        }

        export interface ActionConfirm {
          get $beanFullName(): 'rest-actions.action.confirm';
          get $onionName(): 'rest-actions:confirm';
          get $onionOptions(): IActionOptionsConfirm;
        }

        export interface ActionCopy {
          /** @internal */
          get scope(): ScopeModuleRestActions;
        }

        export interface ActionCopy {
          get $beanFullName(): 'rest-actions.action.copy';
          get $onionName(): 'rest-actions:copy';
          get $onionOptions(): IActionOptionsCopy;
        }

        export interface ActionCreate {
          /** @internal */
          get scope(): ScopeModuleRestActions;
        }

        export interface ActionCreate {
          get $beanFullName(): 'rest-actions.action.create';
          get $onionName(): 'rest-actions:create';
          get $onionOptions(): IActionOptionsCreate;
        }

        export interface ActionDelete {
          /** @internal */
          get scope(): ScopeModuleRestActions;
        }

        export interface ActionDelete {
          get $beanFullName(): 'rest-actions.action.delete';
          get $onionName(): 'rest-actions:delete';
          get $onionOptions(): IActionOptionsDelete;
        }

        export interface ActionEdit {
          /** @internal */
          get scope(): ScopeModuleRestActions;
        }

        export interface ActionEdit {
          get $beanFullName(): 'rest-actions.action.edit';
          get $onionName(): 'rest-actions:edit';
          get $onionOptions(): IActionOptionsEdit;
        }

        export interface ActionSetValue {
          /** @internal */
          get scope(): ScopeModuleRestActions;
        }

        export interface ActionSetValue {
          get $beanFullName(): 'rest-actions.action.setValue';
          get $onionName(): 'rest-actions:setValue';
          get $onionOptions(): IActionOptionsSetValue;
        }

        export interface ActionView {
          /** @internal */
          get scope(): ScopeModuleRestActions;
        }

        export interface ActionView {
          get $beanFullName(): 'rest-actions.action.view';
          get $onionName(): 'rest-actions:view';
          get $onionOptions(): IActionOptionsView;
        } 
}
/** action: end */
/** action: begin */
import { ActionAlert } from '../bean/action.alert.jsx';
import { ActionConfirm } from '../bean/action.confirm.jsx';
import { ActionCopy } from '../bean/action.copy.jsx';
import { ActionCreate } from '../bean/action.create.jsx';
import { ActionDelete } from '../bean/action.delete.jsx';
import { ActionEdit } from '../bean/action.edit.jsx';
import { ActionSetValue } from '../bean/action.setValue.jsx';
import { ActionView } from '../bean/action.view.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'rest-actions.action.alert': ActionAlert;
'rest-actions.action.confirm': ActionConfirm;
'rest-actions.action.copy': ActionCopy;
'rest-actions.action.create': ActionCreate;
'rest-actions.action.delete': ActionDelete;
'rest-actions.action.edit': ActionEdit;
'rest-actions.action.setValue': ActionSetValue;
'rest-actions.action.view': ActionView;
  }
}
/** action: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleRestActions extends BeanScopeBase {}

export interface ScopeModuleRestActions {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'rest-actions': ScopeModuleRestActions;
  }
  
  

  

  
}
  
/** scope: end */
