// eslint-disable
/** controller: begin */
export * from '../component/formFieldCaptcha/controller.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-basic-form' {
  
        export interface ControllerFormFieldCaptcha {
          /** @internal */
          get scope(): ScopeModuleBasicForm;
        } 
}
/** controller: end */
/** controller: begin */
import { ControllerFormFieldCaptcha } from '../component/formFieldCaptcha/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'basic-form.controller.formFieldCaptcha': ControllerFormFieldCaptcha;
  }
}
/** controller: end */

/** components: begin */
export * from './component/formFieldCaptcha.js';
import { ZFormFieldCaptcha } from './component/formFieldCaptcha.js';
export const components = {
  'formFieldCaptcha': ZFormFieldCaptcha,
};
import 'zova';
declare module 'zova' {
export interface IComponentRecord {
  'basic-form:formFieldCaptcha': ControllerFormFieldCaptcha;
}
export interface IZovaComponentRecord {
  'basic-form:formFieldCaptcha': typeof ZFormFieldCaptcha;
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
/** locale: begin */
import { locales } from './locales.js';
/** locale: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil, TypeModuleLocales, TypeLocaleBase } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleBasicForm extends BeanScopeBase {}

export interface ScopeModuleBasicForm {
  util: BeanScopeUtil;
locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'basic-form': ScopeModuleBasicForm;
  }
  
  

  export interface IBeanScopeLocale {
    'basic-form': (typeof locales)[TypeLocaleBase];
  }

  
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `basic-form::${K}` {
  return `basic-form::${key}`;
}  
/** scope: end */
