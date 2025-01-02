/** beans: begin */
export * from '../bean/model.auth.js';
export * from '../bean/model.user.js';
import { ModelAuth } from '../bean/model.auth.js';
import { ModelUser } from '../bean/model.user.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'home-user.model.auth': ModelAuth;
    'home-user.model.user': ModelUser;
  }
}
/** beans: end */
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
import { Scope } from 'zova';

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
/** scope module: begin */
export * from '../bean/model.auth.js';
export * from '../bean/model.user.js';
export * from '../page/login/controller.js';
export * from '../page/login/render.jsx';
export * from '../page/login/style.js';
export * from '../service/auth.js';
export * from '../service/user.js';
declare module 'zova-module-home-user' {
  export interface ModelAuth {
    /** @internal */
    get scope(): ScopeModuleHomeUser;
  }

  export interface ModelUser {
    /** @internal */
    get scope(): ScopeModuleHomeUser;
  }

  export interface ControllerPageLogin {
    /** @internal */
    get scope(): ScopeModuleHomeUser;
  }

  export interface RenderLogin {
    /** @internal */
    get scope(): ScopeModuleHomeUser;
  }

  export interface StyleLogin {
    /** @internal */
    get scope(): ScopeModuleHomeUser;
  }

  export interface ServiceAuth {
    /** @internal */
    get scope(): ScopeModuleHomeUser;
  }

  export interface ServiceUser {
    /** @internal */
    get scope(): ScopeModuleHomeUser;
  }
}
/** scope module: end */
