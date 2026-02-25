/* eslint-disable */
/** controller: begin */
export * from '../component/formFieldCaptcha/controller.jsx';

import 'zova';
declare module 'zova' {


}
declare module 'zova-module-vuetify-form' {

        export interface ControllerFormFieldCaptcha {
          /** @internal */
          get scope(): ScopeModuleVuetifyForm;
        }
}
/** controller: end */
/** controller: begin */
import { ControllerFormFieldCaptcha } from '../component/formFieldCaptcha/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'vuetify-form.controller.formFieldCaptcha': ControllerFormFieldCaptcha;
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
  'vuetify-form:formFieldCaptcha': ControllerFormFieldCaptcha;
}
export interface IZovaComponentRecord {
  'vuetify-form:formFieldCaptcha': typeof ZFormFieldCaptcha;
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
      'vuetify-form:formField': IBehaviorOptionsFormField;
'vuetify-form:formFieldLayout': IBehaviorOptionsFormFieldLayout;
    }


}
declare module 'zova-module-vuetify-form' {

        export interface BehaviorFormField {
          /** @internal */
          get scope(): ScopeModuleVuetifyForm;
        }

        export interface BehaviorFormField {
          get $beanFullName(): 'vuetify-form.behavior.formField';
          get $onionName(): 'vuetify-form:formField';
          get $onionOptions(): IBehaviorOptionsFormField;
        }

        export interface BehaviorFormFieldLayout {
          /** @internal */
          get scope(): ScopeModuleVuetifyForm;
        }

        export interface BehaviorFormFieldLayout {
          get $beanFullName(): 'vuetify-form.behavior.formFieldLayout';
          get $onionName(): 'vuetify-form:formFieldLayout';
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
    'vuetify-form.behavior.formField': BehaviorFormField;
'vuetify-form.behavior.formFieldLayout': BehaviorFormFieldLayout;
  }
}
/** behavior: end */
/** behaviors: begin */
import 'vue';
import 'vue/jsx-runtime';

declare module 'vue' {
  export interface InputHTMLAttributes {
    'bs-vuetify-form-formField'?: IBehaviorOptionsFormField | '' | boolean;
'bs-vuetify-form-formFieldLayout'?: IBehaviorOptionsFormFieldLayout | '' | boolean;
  }
}

declare module 'vue/jsx-runtime' {
  namespace JSX {
    // need define class/style in IntrinsicAttributes
    export interface IntrinsicAttributes {
      'bs-vuetify-form-formField'?: IBehaviorOptionsFormField | '' | boolean;
'bs-vuetify-form-formFieldLayout'?: IBehaviorOptionsFormFieldLayout | '' | boolean;
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
export class ScopeModuleVuetifyForm extends BeanScopeBase {}

export interface ScopeModuleVuetifyForm {
  util: BeanScopeUtil;
locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'vuetify-form': ScopeModuleVuetifyForm;
  }



  export interface IBeanScopeLocale {
    'vuetify-form': (typeof locales)[TypeLocaleBase];
  }


}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `vuetify-form::${K}` {
  return `vuetify-form::${key}`;
}
/** scope: end */
