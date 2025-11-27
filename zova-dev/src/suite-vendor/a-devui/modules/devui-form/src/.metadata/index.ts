/* eslint-disable */
/** behavior: begin */
export * from '../bean/behavior.formFieldLayout.jsx';
export * from '../bean/behavior.formFieldLayoutFilter.js';
import { IBehaviorOptionsFormFieldLayout } from '../bean/behavior.formFieldLayout.jsx';
import { IBehaviorOptionsFormFieldLayoutFilter } from '../bean/behavior.formFieldLayoutFilter.js';
import 'zova-module-a-behavior';
declare module 'zova-module-a-behavior' {
  
    export interface IBehaviorRecord {
      'devui-form:formFieldLayout': IBehaviorOptionsFormFieldLayout;
'devui-form:formFieldLayoutFilter': IBehaviorOptionsFormFieldLayoutFilter;
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

        export interface BehaviorFormFieldLayoutFilter {
          /** @internal */
          get scope(): ScopeModuleDevuiForm;
        }

        export interface BehaviorFormFieldLayoutFilter {
          get $beanFullName(): 'devui-form.behavior.formFieldLayoutFilter';
          get $onionName(): 'devui-form:formFieldLayoutFilter';
          get $onionOptions(): IBehaviorOptionsFormFieldLayoutFilter;
        } 
}
/** behavior: end */
/** behavior: begin */
import { BehaviorFormFieldLayout } from '../bean/behavior.formFieldLayout.jsx';
import { BehaviorFormFieldLayoutFilter } from '../bean/behavior.formFieldLayoutFilter.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'devui-form.behavior.formFieldLayout': BehaviorFormFieldLayout;
'devui-form.behavior.formFieldLayoutFilter': BehaviorFormFieldLayoutFilter;
  }
}
/** behavior: end */
/** behaviors: begin */
import 'vue';
import 'vue/jsx-runtime';

declare module 'vue' {
  export interface InputHTMLAttributes {
    'bs-devui-form-formFieldLayout'?: IBehaviorOptionsFormFieldLayout | '' | boolean;
'bs-devui-form-formFieldLayoutFilter'?: IBehaviorOptionsFormFieldLayoutFilter | '' | boolean;
  }
}

declare module 'vue/jsx-runtime' {
  namespace JSX {
    // need define class/style in IntrinsicAttributes
    export interface IntrinsicAttributes {
      'bs-devui-form-formFieldLayout'?: IBehaviorOptionsFormFieldLayout | '' | boolean;
'bs-devui-form-formFieldLayoutFilter'?: IBehaviorOptionsFormFieldLayoutFilter | '' | boolean;
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
