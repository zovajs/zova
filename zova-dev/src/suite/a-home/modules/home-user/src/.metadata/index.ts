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
export interface IModuleService {
  auth: ServiceAuth;
  user: ServiceUser;
}
/** service: end */
/** service: begin */

import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'home-user.service.auth': ServiceAuth;
    'home-user.service.user': ServiceUser;
  }
}
/** service: end */
/** openapi: begin */

/** openapi: end */
/** model: begin */
export * from '../model/auth.js';
export * from '../model/user.js';

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
import { ModelAuth } from '../model/auth.js';
import { ModelUser } from '../model/user.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'home-user.model.auth': ModelAuth;
    'home-user.model.user': ModelUser;
  }
}
/** model: end */
/** controller: begin */
export * from '../page/login/controller.jsx';

import 'zova';
declare module 'zova' {}
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

export * from '../routes.js';

import 'zova';
declare module 'zova' {
  export interface IPagePathRecord {
    '/home/user/login': undefined;
  }
  export interface IPageNameRecord {}
}
export const pagePathSchemas = {};
export const pageNameSchemas = {};
declare module 'zova-module-home-user' {}

/** pages: end */

/** components: begin */

export const components = {};
import 'zova';
declare module 'zova' {
  export interface IComponentRecord {}
}
declare module 'zova-module-home-user' {}
/** components: end */
/** render: begin */
export * from '../page/login/render.jsx';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-home-user' {
  export interface RenderLogin {
    /** @internal */
    get scope(): ScopeModuleHomeUser;
  }
}
/** render: end */
/** render: begin */
import { RenderLogin } from '../page/login/render.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-user.render.login': RenderLogin;
  }
}
/** render: end */
/** style: begin */
export * from '../page/login/style.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-home-user' {
  export interface StyleLogin {
    /** @internal */
    get scope(): ScopeModuleHomeUser;
  }
}
/** style: end */
/** style: begin */
import { StyleLogin } from '../page/login/style.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-user.style.login': StyleLogin;
  }
}
/** style: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};
/** locale: end */
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
