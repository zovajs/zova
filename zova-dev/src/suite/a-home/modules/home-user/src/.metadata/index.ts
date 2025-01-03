/** service: begin */
export * from '../service/auth.js';
export * from '../service/user.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-home-user' {
  export interface ServiceAuth {
    /** @internal */
    get scope(): ScopeModuleHomeUser;
  }

  export interface ServiceUser {
    /** @internal */
    get scope(): ScopeModuleHomeUser;
  }
}
/** service: end */
/** service: begin */
import { ServiceAuth } from '../service/auth.js';
import { ServiceUser } from '../service/user.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'home-user.service.auth': ServiceAuth;
    'home-user.service.user': ServiceUser;
  }
}
/** service: end */
/** model: begin */
export * from '../bean/model.auth.js';
export * from '../bean/model.user.js';

import 'zova';
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
/** model: end */
/** model: begin */
import { ModelAuth } from '../bean/model.auth.js';
import { ModelUser } from '../bean/model.user.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'home-user.model.auth': ModelAuth;
    'home-user.model.user': ModelUser;
  }
}
/** model: end */
/** pages: begin */
export * from '../page/login/controller.js';
import { ControllerPageLogin } from '../page/login/controller.js';
export * from '../routes.js';

import 'zova';
declare module 'zova' {
  export interface IPagePathRecord {
    '/home/user/login': ControllerPageLogin.QueryInput;
  }
  export interface IPageNameRecord {}
}
export const pagePathSchemas = {
  '/home/user/login': {
    query: ControllerPageLogin.querySchema,
  },
};
export const pageNameSchemas = {};
/** pages: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};
/** locale: end */
/** service: begin */
export * from '../service/auth.js';
export * from '../service/user.js';
import { ServiceAuth } from '../service/auth.js';
import { ServiceUser } from '../service/user.js';
export interface IModuleService {
  auth: ServiceAuth;
  user: ServiceUser;
}
/** service: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil, TypeModuleLocales, TypeLocaleBase } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleHomeUser extends BeanScopeBase {}

export interface ScopeModuleHomeUser {
  util: BeanScopeUtil;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
  service: IModuleService;
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
