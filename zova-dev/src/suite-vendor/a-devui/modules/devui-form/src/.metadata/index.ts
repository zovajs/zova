/* eslint-disable */
/** behavior: begin */
export * from '../bean/behavior.formFieldLayout.jsx';
import { IBehaviorOptionsFormFieldLayout } from '../bean/behavior.formFieldLayout.jsx';
import 'zova-module-a-behavior';
declare module 'zova-module-a-behavior' {
  
    export interface IBehaviorRecord {
      'devui-form:formFieldLayout': IBehaviorOptionsFormFieldLayout;
    }

  
}
declare module 'zova-module-devui-form' {
  
        export interface BehaviorFormFieldLayout {
          /** @internal */
          get scope(): ScopeModuleDevuiForm;
        }

        export interface BehaviorFormFieldLayout {
          get $beanFullName(): 'devui-form.behavior.formFieldLayout';
          get $onionName(): 'devui-form:formFieldLayout';
          get $onionOptions(): IBehaviorOptionsFormFieldLayout;
        } 
}
/** behavior: end */
/** behavior: begin */
import { BehaviorFormFieldLayout } from '../bean/behavior.formFieldLayout.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'devui-form.behavior.formFieldLayout': BehaviorFormFieldLayout;
  }
}
/** behavior: end */
/** behaviors: begin */
import 'vue';
import 'vue/jsx-runtime';

declare module 'vue' {
  export interface InputHTMLAttributes {
    'bs-devui-form-formFieldLayout'?: IBehaviorOptionsFormFieldLayout | '' | boolean;
  }
}

declare module 'vue/jsx-runtime' {
  namespace JSX {
    // need define class/style in IntrinsicAttributes
    export interface IntrinsicAttributes {
      'bs-devui-form-formFieldLayout'?: IBehaviorOptionsFormFieldLayout | '' | boolean;
    }
  }
}
/** behaviors: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleDevuiForm extends BeanScopeBase {}

export interface ScopeModuleDevuiForm {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'devui-form': ScopeModuleDevuiForm;
  }
  
  

  

  
}
  
/** scope: end */
