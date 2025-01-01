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
/** beans: end */
/** pages: begin */
export * as NSControllerPageLogin from '../page/login/controller.js';
import * as NSControllerPageLogin from '../page/login/controller.js';
export * from '../routes.js';

import 'zova';
declare module 'zova' {
  export interface IPagePathRecord {
    '/home/user/login': NSControllerPageLogin.QueryInput;
  }
  export interface IPageNameRecord {}
}
export const pagePathSchemas = {
  '/home/user/login': {
    query: NSControllerPageLogin.QuerySchema,
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
import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleHomeUser extends BeanScopeBase {}

export interface ScopeModuleHomeUser
  extends TypeModuleResource<never, never, (typeof locales)[TypeLocaleBase], never, IModuleService> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'home-user': ScopeModuleHomeUser;
  }

  export interface IBeanScopeLocale {
    'home-user': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
