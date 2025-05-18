import type { BeanScopeUtil } from 'zova';
/** behaviors: end */
/** scope: begin */
import { BeanScopeBase } from 'zova';
import { Scope } from 'zova-module-a-bean';
/** behavior: begin */
import { IBehaviorOptionsFormFieldLayout } from '../bean/behavior.formFieldLayout.jsx';
/** behavior: end */
/** behavior: begin */
import { BehaviorFormFieldLayout } from '../bean/behavior.formFieldLayout.jsx';
import 'zova';
import 'zova';
/** behavior: end */
/** behaviors: begin */
import 'vue';
import 'vue/jsx-runtime';

import 'zova';

export * from '../bean/behavior.formFieldLayout.jsx';
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
}
declare module 'zova' {
  export interface IBeanRecordLocal {
    'devui-form.behavior.formFieldLayout': BehaviorFormFieldLayout;
  }
}

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

@Scope()
export class ScopeModuleDevuiForm extends BeanScopeBase {}

export interface ScopeModuleDevuiForm {
  util: BeanScopeUtil;
}

declare module 'zova' {
  export interface IBeanScopeRecord {
    'devui-form': ScopeModuleDevuiForm;
  }

}

/** scope: end */
