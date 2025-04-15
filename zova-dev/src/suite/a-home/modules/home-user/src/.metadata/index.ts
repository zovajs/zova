import type { BeanScopeUtil } from 'zova';
/** locale: end */
/** scope: begin */
import { BeanScopeBase, TypeLocaleBase, TypeModuleLocales } from 'zova';
import { Scope } from 'zova-module-a-bean';

/** model: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';

import locale_zh_cn from '../config/locale/zh-cn.js';
/** model: end */
/** model: begin */
import { ModelAuth } from '../model/auth.js';
import { ModelPassport } from '../model/passport.js';
import { ModelUser } from '../model/user.js';
/** controller: end */
/** controller: begin */
import { ControllerPageLogin } from '../page/login/controller.jsx';
/** model: begin */
import 'zova';
import 'zova';
import 'zova';
import 'zova';
import 'zova';

import 'zova';

export * from '../model/auth.js';
declare module 'zova' {

}
declare module 'zova-module-home-user' {

  export interface ControllerPageLogin {
    /** @internal */
    get scope(): ScopeModuleHomeUser;
  }
}
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-user.controller.pageLogin': ControllerPageLogin;
  }
}
export * from '../model/passport.js';
export * from '../model/user.js';
declare module 'zova' {
  export interface IPagePathRecord {
    '/home/user/login': undefined;
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

/** controller: begin */
export * from '../page/login/controller.jsx';
export * from '../routes.js';
/** controller: end */
/** pages: begin */
export * from './page/login.js';
declare module 'zova' {

}
declare module 'zova-module-home-user' {

  export interface ModelAuth {
    /** @internal */
    get scope(): ScopeModuleHomeUser;
  }

  export interface ModelPassport {
    /** @internal */
    get scope(): ScopeModuleHomeUser;
  }

  export interface ModelUser {
    /** @internal */
    get scope(): ScopeModuleHomeUser;
  }
}
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'home-user.model.auth': ModelAuth;
    'home-user.model.passport': ModelPassport;
    'home-user.model.user': ModelUser;
  }
}
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};

@Scope()
export class ScopeModuleHomeUser extends BeanScopeBase {}

export interface ScopeModuleHomeUser {
  util: BeanScopeUtil;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

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
