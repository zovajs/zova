/* eslint-disable */
/** controller: begin */
export * from '../component/formFieldCaptcha/controller.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-devui-form' {
  
        export interface ControllerFormFieldCaptcha {
          /** @internal */
          get scope(): ScopeModuleDevuiForm;
        } 
}
/** controller: end */
/** controller: begin */
import { ControllerFormFieldCaptcha } from '../component/formFieldCaptcha/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'devui-form.controller.formFieldCaptcha': ControllerFormFieldCaptcha;
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
  'devui-form:formFieldCaptcha': ControllerFormFieldCaptcha;
}
export interface IZovaComponentRecord {
  'devui-form:formFieldCaptcha': typeof ZFormFieldCaptcha;
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
      'devui-form:formField': IBehaviorOptionsFormField;
'devui-form:formFieldLayout': IBehaviorOptionsFormFieldLayout;
    }

  
}
declare module 'zova-module-devui-form' {
  
        export interface BehaviorFormField {
          /** @internal */
          get scope(): ScopeModuleDevuiForm;
        }

        export interface BehaviorFormField {
          get $beanFullName(): 'devui-form.behavior.formField';
          get $onionName(): 'devui-form:formField';
          get $onionOptions(): IBehaviorOptionsFormField;
        }

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
import { BehaviorFormField } from '../bean/behavior.formField.js';
import { BehaviorFormFieldLayout } from '../bean/behavior.formFieldLayout.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'devui-form.behavior.formField': BehaviorFormField;
'devui-form.behavior.formFieldLayout': BehaviorFormFieldLayout;
  }
}
/** behavior: end */
/** behaviors: begin */
import 'vue';
import 'vue/jsx-runtime';

declare module 'vue' {
  export interface InputHTMLAttributes {
    'bs-devui-form-formField'?: IBehaviorOptionsFormField | '' | boolean;
'bs-devui-form-formFieldLayout'?: IBehaviorOptionsFormFieldLayout | '' | boolean;
  }
}

declare module 'vue/jsx-runtime' {
  namespace JSX {
    // need define class/style in IntrinsicAttributes
    export interface IntrinsicAttributes {
      'bs-devui-form-formField'?: IBehaviorOptionsFormField | '' | boolean;
'bs-devui-form-formFieldLayout'?: IBehaviorOptionsFormFieldLayout | '' | boolean;
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
export class ScopeModuleDevuiForm extends BeanScopeBase {}

export interface ScopeModuleDevuiForm {
  util: BeanScopeUtil;
locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'devui-form': ScopeModuleDevuiForm;
  }
  
  

  export interface IBeanScopeLocale {
    'devui-form': (typeof locales)[TypeLocaleBase];
  }

  
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `devui-form::${K}` {
  return `devui-form::${key}`;
}  
/** scope: end */
