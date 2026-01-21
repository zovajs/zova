/* eslint-disable */
/** model: begin */
export * from '../model/passport.js';
import { IModelOptionsPassport } from '../model/passport.js';
import 'zova-module-a-model';
declare module 'zova-module-a-model' {
  
    export interface IModelRecord {
      'home-user:passport': IModelOptionsPassport;
    }

  
}
declare module 'zova-module-home-user' {
  
        export interface ModelPassport {
          /** @internal */
          get scope(): ScopeModuleHomeUser;
        }

        export interface ModelPassport {
          get $beanFullName(): 'home-user.model.passport';
          get $onionName(): 'home-user:passport';
          get $onionOptions(): IModelOptionsPassport;
        } 
}
/** model: end */
/** model: begin */
import { ModelPassport } from '../model/passport.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'home-user.model.passport': ModelPassport;
  }
}
/** model: end */
/** controller: begin */
export * from '../component/formFieldCaptcha/controller.jsx';
export * from '../page/login/controller.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-home-user' {
  
        export interface ControllerFormFieldCaptcha {
          /** @internal */
          get scope(): ScopeModuleHomeUser;
        }

        export interface ControllerPageLogin {
          /** @internal */
          get scope(): ScopeModuleHomeUser;
        } 
}
/** controller: end */
/** controller: begin */
import { ControllerFormFieldCaptcha } from '../component/formFieldCaptcha/controller.jsx';
import { ControllerPageLogin } from '../page/login/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-user.controller.formFieldCaptcha': ControllerFormFieldCaptcha;
'home-user.controller.pageLogin': ControllerPageLogin;
  }
}
/** controller: end */
/** pages: begin */
export * from './page/login.js';
export * from '../routes.js';
import { TypePagePathSchema } from 'zova-module-a-router';
import 'zova';
declare module 'zova-module-a-router' {
export interface IPagePathRecord {
  '/home/user/login': TypePagePathSchema<undefined,undefined>;
}
export interface IPageNameRecord {
  
}
}
export const pagePathSchemas = {

};
export const pageNameSchemas = {

};
declare module 'zova-module-home-user' {
   
}
/** pages: end */

/** components: begin */
export * from './component/formFieldCaptcha.js';
import { ZFormFieldCaptcha } from './component/formFieldCaptcha.js';
export const components = {
  'formFieldCaptcha': ZFormFieldCaptcha,
};
import 'zova';
declare module 'zova' {
export interface IComponentRecord {
  'home-user:formFieldCaptcha': ControllerFormFieldCaptcha;
}
export interface IZovaComponentRecord {
  'home-user:formFieldCaptcha': typeof ZFormFieldCaptcha;
}
}
/** components: end */
/** render: begin */
export * from '../page/login/render.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-home-user' {
  
        export interface RenderPageLogin {
          /** @internal */
          get scope(): ScopeModuleHomeUser;
        } 
}
/** render: end */
/** render: begin */
import { RenderPageLogin } from '../page/login/render.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-user.render.pageLogin': RenderPageLogin;
  }
}
/** render: end */
/** behavior: begin */
export * from '../bean/behavior.formFieldLayoutLogin.jsx';
import { IBehaviorOptionsFormFieldLayoutLogin } from '../bean/behavior.formFieldLayoutLogin.jsx';
import 'zova-module-a-behavior';
declare module 'zova-module-a-behavior' {
  
    export interface IBehaviorRecord {
      'home-user:formFieldLayoutLogin': IBehaviorOptionsFormFieldLayoutLogin;
    }

  
}
declare module 'zova-module-home-user' {
  
        export interface BehaviorFormFieldLayoutLogin {
          /** @internal */
          get scope(): ScopeModuleHomeUser;
        }

        export interface BehaviorFormFieldLayoutLogin {
          get $beanFullName(): 'home-user.behavior.formFieldLayoutLogin';
          get $onionName(): 'home-user:formFieldLayoutLogin';
          get $onionOptions(): IBehaviorOptionsFormFieldLayoutLogin;
        } 
}
/** behavior: end */
/** behavior: begin */
import { BehaviorFormFieldLayoutLogin } from '../bean/behavior.formFieldLayoutLogin.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-user.behavior.formFieldLayoutLogin': BehaviorFormFieldLayoutLogin;
  }
}
/** behavior: end */
/** behaviors: begin */
import 'vue';
import 'vue/jsx-runtime';

declare module 'vue' {
  export interface InputHTMLAttributes {
    'bs-home-user-formFieldLayoutLogin'?: IBehaviorOptionsFormFieldLayoutLogin | '' | boolean;
  }
}

declare module 'vue/jsx-runtime' {
  namespace JSX {
    // need define class/style in IntrinsicAttributes
    export interface IntrinsicAttributes {
      'bs-home-user-formFieldLayoutLogin'?: IBehaviorOptionsFormFieldLayoutLogin | '' | boolean;
    }
  }
}
/** behaviors: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** locale: begin */
import { locales } from './locales.js';
/** locale: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil, TypeModuleConfig, TypeModuleLocales, TypeLocaleBase } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleHomeUser extends BeanScopeBase {}

export interface ScopeModuleHomeUser {
  util: BeanScopeUtil;
config: TypeModuleConfig<typeof config>;
locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'home-user': ScopeModuleHomeUser;
  }
  
  export interface IBeanScopeConfig {
    'home-user': ReturnType<typeof config>;
  }

  export interface IBeanScopeLocale {
    'home-user': (typeof locales)[TypeLocaleBase];
  }

  
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `home-user::${K}` {
  return `home-user::${key}`;
}  
/** scope: end */
