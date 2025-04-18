import type { BeanScopeUtil } from 'zova';
/** locale: end */
/** scope: begin */
import { BeanScopeBase, TypeLocaleBase, TypeModuleConfig, TypeModuleLocales } from 'zova';
import { Scope } from 'zova-module-a-bean';
import { config } from '../config/config.js';

/** config: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
/** model: end */
/** model: begin */
import { ModelPassport } from '../model/passport.js';
/** controller: end */
/** controller: begin */
import { ControllerPageLogin } from '../page/login/controller.jsx';
/** model: end */
/** config: begin */
import 'zova';
import 'zova';
import 'zova';
import 'zova';
import 'zova';

import 'zova';

export * from '../config/config.js';
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
/** model: begin */
export * from '../model/passport.js';
/** controller: begin */
export * from '../page/login/controller.jsx';
declare module 'zova-module-a-router' {
  export interface IPagePathRecord {
    '/home/user/login': {
      path: '/home/user/login';
      schema: undefined;
    };
  }
}
export const pagePathSchemas = {

};
export const pageNameSchemas = {

};
declare module 'zova-module-home-user' {

}
/** pages: end */

export * from '../routes.js';
declare module 'zova' {

}
declare module 'zova-module-home-user' {

  export interface ModelPassport {
    /** @internal */
    get scope(): ScopeModuleHomeUser;
  }
}
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'home-user.model.passport': ModelPassport;
  }
}
/** controller: end */
/** pages: begin */
export * from './page/login.js';
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};

@Scope()
export class ScopeModuleHomeUser extends BeanScopeBase {}

export interface ScopeModuleHomeUser {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

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
