// eslint-disable
/** controller: begin */
export * from '../component/actionOperationsRow/controller.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-basic-form' {
  
        export interface ControllerActionOperationsRow {
          /** @internal */
          get scope(): ScopeModuleBasicForm;
        } 
}
/** controller: end */
/** controller: begin */
import { ControllerActionOperationsRow } from '../component/actionOperationsRow/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'basic-form.controller.actionOperationsRow': ControllerActionOperationsRow;
  }
}
/** controller: end */

/** components: begin */
export * from './component/actionOperationsRow.js';
import { ZActionOperationsRow } from './component/actionOperationsRow.js';
export const components = {
  'actionOperationsRow': ZActionOperationsRow,
};
import 'zova';
declare module 'zova' {
export interface IComponentRecord {
  'basic-form:actionOperationsRow': ControllerActionOperationsRow;
}
export interface IZovaComponentRecord {
  'basic-form:actionOperationsRow': typeof ZActionOperationsRow;
}
}
/** components: end */
/** behavior: begin */
export * from '../bean/behavior.formField.js';
export * from '../bean/behavior.formFieldLayout.jsx';
import { IBehaviorOptionsFormField } from '../bean/behavior.formField.js';
import { IBehaviorOptionsFormFieldLayout } from '../bean/behavior.formFieldLayout.jsx';
import 'zova-module-a-behavior';
declare module 'zova-module-a-behavior' {
  
    export interface IBehaviorRecord {
      'basic-form:formField': IBehaviorOptionsFormField;
'basic-form:formFieldLayout': IBehaviorOptionsFormFieldLayout;
    }

  
}
declare module 'zova-module-basic-form' {
  
        export interface BehaviorFormField {
          /** @internal */
          get scope(): ScopeModuleBasicForm;
        }

        export interface BehaviorFormField {
          get $beanFullName(): 'basic-form.behavior.formField';
          get $onionName(): 'basic-form:formField';
          get $onionOptions(): IBehaviorOptionsFormField;
        }

        export interface BehaviorFormFieldLayout {
          /** @internal */
          get scope(): ScopeModuleBasicForm;
        }

        export interface BehaviorFormFieldLayout {
          get $beanFullName(): 'basic-form.behavior.formFieldLayout';
          get $onionName(): 'basic-form:formFieldLayout';
          get $onionOptions(): IBehaviorOptionsFormFieldLayout;
        } 
}
/** behavior: end */
/** behavior: begin */
import { BehaviorFormField } from '../bean/behavior.formField.js';
import { BehaviorFormFieldLayout } from '../bean/behavior.formFieldLayout.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'basic-form.behavior.formField': BehaviorFormField;
'basic-form.behavior.formFieldLayout': BehaviorFormFieldLayout;
  }
}
/** behavior: end */
/** behaviors: begin */
import 'vue';
import 'vue/jsx-runtime';

declare module 'vue' {
  export interface InputHTMLAttributes {
    'bs-basic-form-formField'?: IBehaviorOptionsFormField | '' | boolean;
'bs-basic-form-formFieldLayout'?: IBehaviorOptionsFormFieldLayout | '' | boolean;
  }
}

declare module 'vue/jsx-runtime' {
  namespace JSX {
    // need define class/style in IntrinsicAttributes
    export interface IntrinsicAttributes {
      'bs-basic-form-formField'?: IBehaviorOptionsFormField | '' | boolean;
'bs-basic-form-formFieldLayout'?: IBehaviorOptionsFormFieldLayout | '' | boolean;
    }
  }
}
/** behaviors: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleBasicForm extends BeanScopeBase {}

export interface ScopeModuleBasicForm {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'basic-form': ScopeModuleBasicForm;
  }
  
  

  

  
}
  
/** scope: end */
