// eslint-disable
/** controller: begin */
export * from '../component/formFieldCaptcha/controller.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-quasar-form' {
  
        export interface ControllerFormFieldCaptcha {
          /** @internal */
          get scope(): ScopeModuleQuasarForm;
        } 
}
/** controller: end */
/** controller: begin */
import { ControllerFormFieldCaptcha } from '../component/formFieldCaptcha/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'quasar-form.controller.formFieldCaptcha': ControllerFormFieldCaptcha;
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
  'quasar-form:formFieldCaptcha': ControllerFormFieldCaptcha;
}
export interface IZovaComponentRecord {
  'quasar-form:formFieldCaptcha': typeof ZFormFieldCaptcha;
}
}
/** components: end */
/** behavior: begin */
export * from '../bean/behavior.formField.jsx';
export * from '../bean/behavior.formFieldLayout.js';
import { IBehaviorOptionsFormField } from '../bean/behavior.formField.jsx';
import { IBehaviorOptionsFormFieldLayout } from '../bean/behavior.formFieldLayout.js';
import 'zova-module-a-behavior';
declare module 'zova-module-a-behavior' {
  
    export interface IBehaviorRecord {
      'quasar-form:formField': IBehaviorOptionsFormField;
'quasar-form:formFieldLayout': IBehaviorOptionsFormFieldLayout;
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

        export interface BehaviorFormFieldLayout {
          /** @internal */
          get scope(): ScopeModuleQuasarForm;
        }

        export interface BehaviorFormFieldLayout {
          get $beanFullName(): 'quasar-form.behavior.formFieldLayout';
          get $onionName(): 'quasar-form:formFieldLayout';
          get $onionOptions(): IBehaviorOptionsFormFieldLayout;
        } 
}
/** behavior: end */
/** behavior: begin */
import { BehaviorFormField } from '../bean/behavior.formField.jsx';
import { BehaviorFormFieldLayout } from '../bean/behavior.formFieldLayout.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'quasar-form.behavior.formField': BehaviorFormField;
'quasar-form.behavior.formFieldLayout': BehaviorFormFieldLayout;
  }
}
/** behavior: end */
/** behaviors: begin */
import 'vue';
import 'vue/jsx-runtime';

declare module 'vue' {
  export interface InputHTMLAttributes {
    'bs-quasar-form-formField'?: IBehaviorOptionsFormField | '' | boolean;
'bs-quasar-form-formFieldLayout'?: IBehaviorOptionsFormFieldLayout | '' | boolean;
  }
}

declare module 'vue/jsx-runtime' {
  namespace JSX {
    // need define class/style in IntrinsicAttributes
    export interface IntrinsicAttributes {
      'bs-quasar-form-formField'?: IBehaviorOptionsFormField | '' | boolean;
'bs-quasar-form-formFieldLayout'?: IBehaviorOptionsFormFieldLayout | '' | boolean;
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
export class ScopeModuleQuasarForm extends BeanScopeBase {}

export interface ScopeModuleQuasarForm {
  util: BeanScopeUtil;
locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'quasar-form': ScopeModuleQuasarForm;
  }
  
  

  export interface IBeanScopeLocale {
    'quasar-form': (typeof locales)[TypeLocaleBase];
  }

  
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `quasar-form::${K}` {
  return `quasar-form::${key}`;
}  
/** scope: end */
