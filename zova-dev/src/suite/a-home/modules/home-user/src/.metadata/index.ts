/** locale: end */
/** scope: begin */
import type { BeanScopeUtil, TypeLocaleBase, TypeModuleLocales } from 'zova';
/** api: end */
/** api: begin */
import type { ApiAuth } from '../api/auth.js';
import type { ApiUser } from '../api/user.js';
/** model: end */
/** model: begin */
import type { ModelAuth } from '../model/auth.js';
/** api: end */
/** api: begin */

import type { ModelUser } from '../model/user.js';

/** controller: end */
/** controller: begin */
import type { ControllerPageLogin } from '../page/login/controller.jsx';
import { BeanScopeBase } from 'zova';
import { Scope } from 'zova-module-a-bean';
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';

import locale_zh_cn from '../config/locale/zh-cn.js';
/** api: begin */
import 'zova';
import 'zova';

import 'zova';
/** pages: end */

import 'zova';
import 'zova';
import 'zova';
import 'zova';

import 'zova';

export * from '../api/auth.js';
export * from '../api/user.js';
declare module 'zova' {}
declare module 'zova-module-home-user' {
  export interface ApiAuth {
    /** @internal */
    get scope(): ScopeModuleHomeUser;
  }

  export interface ApiUser {
    /** @internal */
    get scope(): ScopeModuleHomeUser;
  }
}
export interface IModuleApi {
  auth: ApiAuth;
  user: ApiUser;
}
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'home-user.api.auth': ApiAuth;
    'home-user.api.user': ApiUser;
  }
}
/** api: end */
/** openapi: begin */

/** openapi: end */
/** model: begin */
export * from '../model/auth.js';
export * from '../model/user.js';
declare module 'zova' {}
declare module 'zova-module-home-user' {
  export interface ModelAuth {
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
    'home-user.model.user': ModelUser;
  }
}
/** model: end */
/** controller: begin */
export * from '../page/login/controller.jsx';
declare module 'zova' {}
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
/** controller: end */
/** pages: begin */

export * from '../routes.js';
declare module 'zova' {
  export interface IPagePathRecord {
    '/home/user/login': undefined;
  }
  export interface IPageNameRecord {}
}
export const pagePathSchemas = {};
export const pageNameSchemas = {};
declare module 'zova-module-home-user' {}
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};

@Scope()
export class ScopeModuleHomeUser extends BeanScopeBase {}

export interface ScopeModuleHomeUser {
  util: BeanScopeUtil;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  api: IModuleApi;
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
