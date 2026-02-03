/* eslint-disable */
/** behavior: begin */
export * from '../bean/behavior.formField.jsx';
import { IBehaviorOptionsFormField } from '../bean/behavior.formField.jsx';
import 'zova-module-a-behavior';
declare module 'zova-module-a-behavior' {
  
    export interface IBehaviorRecord {
      'quasar-form:formField': IBehaviorOptionsFormField;
    }

  
}
declare module 'zova-module-quasar-form' {
  
        export interface BehaviorFormField {
          /** @internal */
          get scope(): ScopeModuleQuasarForm;
        }

        export interface BehaviorFormField {
          get $beanFullName(): 'quasar-form.behavior.formField';
          get $onionName(): 'quasar-form:formField';
          get $onionOptions(): IBehaviorOptionsFormField;
        } 
}
/** behavior: end */
/** behavior: begin */
import { BehaviorFormField } from '../bean/behavior.formField.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'quasar-form.behavior.formField': BehaviorFormField;
  }
}
/** behavior: end */
/** behaviors: begin */
import 'vue';
import 'vue/jsx-runtime';

declare module 'vue' {
  export interface InputHTMLAttributes {
    'bs-quasar-form-formField'?: IBehaviorOptionsFormField | '' | boolean;
  }
}

declare module 'vue/jsx-runtime' {
  namespace JSX {
    // need define class/style in IntrinsicAttributes
    export interface IntrinsicAttributes {
      'bs-quasar-form-formField'?: IBehaviorOptionsFormField | '' | boolean;
    }
  }
}
/** behaviors: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleQuasarForm extends BeanScopeBase {}

export interface ScopeModuleQuasarForm {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'quasar-form': ScopeModuleQuasarForm;
  }
  
  

  

  
}
  
/** scope: end */
