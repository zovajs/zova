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
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
export const locales = {
  'en-us': locale_en_us,
'zh-cn': locale_zh_cn,
};
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
