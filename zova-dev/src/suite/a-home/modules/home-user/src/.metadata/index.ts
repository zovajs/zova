/* eslint-disable */
/** controller: begin */
export * from '../page/login/controller.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-home-user' {
  
        export interface ControllerPageLogin {
          /** @internal */
          get scope(): ScopeModuleHomeUser;
        } 
}
/** controller: end */
/** controller: begin */
import { ControllerPageLogin } from '../page/login/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
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
/** locale: begin */
import { locales } from './locales.js';
/** locale: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil, TypeModuleLocales, TypeLocaleBase } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleHomeUser extends BeanScopeBase {}

export interface ScopeModuleHomeUser {
  util: BeanScopeUtil;
locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'home-user': ScopeModuleHomeUser;
  }
  
  

  export interface IBeanScopeLocale {
    'home-user': (typeof locales)[TypeLocaleBase];
  }

  
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `home-user::${K}` {
  return `home-user::${key}`;
}  
/** scope: end */
