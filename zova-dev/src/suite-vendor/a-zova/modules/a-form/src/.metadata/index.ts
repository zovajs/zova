import type { BeanScopeUtil } from 'zova';
/** behaviors: end */
/** scope: begin */
import { BeanScopeBase } from 'zova';
import { Scope } from 'zova-module-a-bean';
/** behavior: begin */
import { IBehaviorOptionsForm } from '../bean/behavior.form.js';
/** behavior: end */
/** behavior: begin */
import { BehaviorForm } from '../bean/behavior.form.js';
import { IBehaviorOptionsFormField } from '../bean/behavior.formField.js';
import { BehaviorFormField } from '../bean/behavior.formField.js';
import 'zova';
import 'zova';
/** behavior: end */
/** behaviors: begin */
import 'vue';
import 'vue/jsx-runtime';

import 'zova';

export * from '../bean/behavior.form.js';
export * from '../bean/behavior.formField.js';
declare module 'zova-module-a-behavior' {

  export interface IBehaviorRecord {
    'a-form:form': IBehaviorOptionsForm;
    'a-form:formField': IBehaviorOptionsFormField;
  }

}
declare module 'zova-module-a-form' {

  export interface BehaviorForm {
    /** @internal */
    get scope(): ScopeModuleAForm;
  }

  export interface BehaviorFormField {
    /** @internal */
    get scope(): ScopeModuleAForm;
  }
}
declare module 'zova' {
  export interface IBeanRecordLocal {
    'a-form.behavior.form': BehaviorForm;
    'a-form.behavior.formField': BehaviorFormField;
  }
}

declare module 'vue' {
  export interface InputHTMLAttributes {
    'bs-form'?: IBehaviorOptionsForm | '' | boolean;
    'bs-formField'?: IBehaviorOptionsFormField | '' | boolean;
  }
}

declare module 'vue/jsx-runtime' {
  namespace JSX {
    // need define class/style in IntrinsicAttributes
    export interface IntrinsicAttributes {
      'bs-form'?: IBehaviorOptionsForm | '' | boolean;
      'bs-formField'?: IBehaviorOptionsFormField | '' | boolean;
    }
  }
}

@Scope()
export class ScopeModuleAForm extends BeanScopeBase {}

export interface ScopeModuleAForm {
  util: BeanScopeUtil;
}

declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-form': ScopeModuleAForm;
  }

}

/** scope: end */
