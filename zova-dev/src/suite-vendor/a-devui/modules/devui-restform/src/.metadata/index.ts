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
    'devui-restform:formFieldLayout': IBehaviorOptionsFormFieldLayout;
  }

}
declare module 'zova-module-devui-restform' {

  export interface BehaviorFormFieldLayout {
    /** @internal */
    get scope(): ScopeModuleDevuiRestform;
  }
}
declare module 'zova' {
  export interface IBeanRecordLocal {
    'devui-restform.behavior.formFieldLayout': BehaviorFormFieldLayout;
  }
}

declare module 'vue' {
  export interface InputHTMLAttributes {
    'bs-devui-restform-formFieldLayout'?: IBehaviorOptionsFormFieldLayout | '' | boolean;
  }
}

declare module 'vue/jsx-runtime' {
  namespace JSX {
    // need define class/style in IntrinsicAttributes
    export interface IntrinsicAttributes {
      'bs-devui-restform-formFieldLayout'?: IBehaviorOptionsFormFieldLayout | '' | boolean;
    }
  }
}

@Scope()
export class ScopeModuleDevuiRestform extends BeanScopeBase {}

export interface ScopeModuleDevuiRestform {
  util: BeanScopeUtil;
}

declare module 'zova' {
  export interface IBeanScopeRecord {
    'devui-restform': ScopeModuleDevuiRestform;
  }

}

/** scope: end */
