/** monkey: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil, TypeLocaleBase, TypeModuleLocales } from 'zova';
import { Scope } from 'zova-module-a-bean';
/** css: end */
/** css: begin */
import { CssDefault } from '../bean/css.default.js';
/** theme: end */
/** theme: begin */
import { ThemeDefault } from '../bean/theme.default.js';

/** controller: end */
/** controller: begin */
import { ControllerPage } from '../component/page/controller.jsx';
/** theme: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
import { ControllerPageErrorNotFound } from '../page/errorNotFound/controller.jsx';

/** service: end */
/** service: begin */
import { ServiceRouter } from '../service/router.js';
import { ServiceSsr } from '../service/ssr.js';
import { ZPage } from './component/page.js';

/** components: end */
/** css: begin */
import 'zova';
import 'zova';
import 'zova';

import 'zova';
import 'zova';
import 'zova';
import 'zova';
import 'zova';
import 'zova';
import 'zova';

import 'zova';

export * from '../bean/css.default.js';
/** css: end */
/** theme: begin */
export * from '../bean/theme.default.js';
declare module 'zova-module-a-bean' {

  export interface IServiceRecord {
    'home-base:router': never;
    'home-base:ssr': never;
  }

}
declare module 'zova-module-home-base' {

  export interface ServiceRouter {
    /** @internal */
    get scope(): ScopeModuleHomeBase;
  }

  export interface ServiceSsr {
    /** @internal */
    get scope(): ScopeModuleHomeBase;
  }
}
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'home-base.service.router': ServiceRouter;
    'home-base.service.ssr': ServiceSsr;
  }
}
/** service: end */
/** controller: begin */
export * from '../component/page/controller.jsx';
/** locale: end */
/** monkey: begin */
export * from '../monkey.js';
declare module 'zova' {

}
declare module 'zova-module-home-base' {

  export interface ControllerPage {
    /** @internal */
    get scope(): ScopeModuleHomeBase;
  }

  export interface ControllerPageErrorNotFound {
    /** @internal */
    get scope(): ScopeModuleHomeBase;
  }
}
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-base.controller.page': ControllerPage;
    'home-base.controller.pageErrorNotFound': ControllerPageErrorNotFound;
  }
}
export * from '../page/errorNotFound/controller.jsx';
export * from '../routes.js';
declare module 'zova' {
  export interface IPagePathRecord {
    '/home/base//:catchAll(.*)*': undefined;
  }
  export interface IPageNameRecord {

  }
}
export const pagePathSchemas = {

};
export const pageNameSchemas = {

};
declare module 'zova-module-home-base' {

}
/** pages: end */

/** service: begin */
export * from '../service/router.js';
export const components = {
  page: ZPage,
};
declare module 'zova' {
  export interface IComponentRecord {
    'home-base:page': ControllerPage;
  }
}
export * from '../service/ssr.js';
declare module 'zova' {

}
declare module 'zova-module-home-base' {

  export interface CssDefault {
    /** @internal */
    get scope(): ScopeModuleHomeBase;
  }
}
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'home-base.css.default': CssDefault;
  }
}
/** components: begin */
export * from './component/page.js';
declare module 'zova' {

}
declare module 'zova-module-home-base' {

  export interface ThemeDefault {
    /** @internal */
    get scope(): ScopeModuleHomeBase;
  }
}
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'home-base.theme.default': ThemeDefault;
  }
}
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};
/** controller: end */
/** pages: begin */
export * from './page/errorNotFound.js';

@Scope()
export class ScopeModuleHomeBase extends BeanScopeBase {}

export interface ScopeModuleHomeBase {
  util: BeanScopeUtil;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

declare module 'zova' {
  export interface IBeanScopeRecord {
    'home-base': ScopeModuleHomeBase;
  }

  export interface IBeanScopeLocale {
    'home-base': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `home-base::${K}` {
  return `home-base::${key}`;
}
/** scope: end */
