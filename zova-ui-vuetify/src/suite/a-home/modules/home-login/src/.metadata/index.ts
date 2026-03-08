/* eslint-disable */
/** controller: begin */
export * from '../page/authCallback/controller.jsx';
export * from '../page/login/controller.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-home-login' {
  
        export interface ControllerPageAuthCallback {
          /** @internal */
          get scope(): ScopeModuleHomeLogin;
        }

        export interface ControllerPageLogin {
          /** @internal */
          get scope(): ScopeModuleHomeLogin;
        } 
}
/** controller: end */
/** controller: begin */
import { ControllerPageAuthCallback } from '../page/authCallback/controller.jsx';
import { ControllerPageLogin } from '../page/login/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-login.controller.pageAuthCallback': ControllerPageAuthCallback;
'home-login.controller.pageLogin': ControllerPageLogin;
  }
}
/** controller: end */
/** pages: begin */
export * from './page/authCallback.js';
export * from './page/login.js';
export * from '../routes.js';
import { TypePagePathSchema } from 'zova-module-a-router';
import 'zova';
declare module 'zova-module-a-router' {
export interface IPagePathRecord {
  '/home/login/authCallback': TypePagePathSchema<undefined,undefined>;
'/home/login': TypePagePathSchema<undefined,undefined>;
}
export interface IPageNameRecord {
  
}
}
export const pagePathSchemas = {

};
export const pageNameSchemas = {

};
declare module 'zova-module-home-login' {
  
}
/** pages: end */

/** render: begin */
export * from '../page/login/render.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-home-login' {
  
        export interface RenderPageLogin {
          /** @internal */
          get scope(): ScopeModuleHomeLogin;
        } 
}
/** render: end */
/** render: begin */
import { RenderPageLogin } from '../page/login/render.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-login.render.pageLogin': RenderPageLogin;
  }
}
/** render: end */
/** locale: begin */
import { locales } from './locales.js';
/** locale: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil, TypeModuleLocales, TypeLocaleBase } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleHomeLogin extends BeanScopeBase {}

export interface ScopeModuleHomeLogin {
  util: BeanScopeUtil;
locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'home-login': ScopeModuleHomeLogin;
  }
  
  

  export interface IBeanScopeLocale {
    'home-login': (typeof locales)[TypeLocaleBase];
  }

  
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `home-login::${K}` {
  return `home-login::${key}`;
}  
/** scope: end */
