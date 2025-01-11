/** css: begin */
export * from '../bean/css.default.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-home-base' {
  export interface CssDefault {
    /** @internal */
    get scope(): ScopeModuleHomeBase;
  }
}
/** css: end */
/** css: begin */
import { CssDefault } from '../bean/css.default.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'home-base.css.default': CssDefault;
  }
}
/** css: end */
/** theme: begin */
export * from '../bean/theme.default.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-home-base' {
  export interface ThemeDefault {
    /** @internal */
    get scope(): ScopeModuleHomeBase;
  }
}
/** theme: end */
/** theme: begin */
import { ThemeDefault } from '../bean/theme.default.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'home-base.theme.default': ThemeDefault;
  }
}
/** theme: end */
/** service: begin */
export * from '../bean/service.router.js';
export * from '../bean/service.ssr.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-home-base' {
  export interface ServiceRouter {
    /** @internal */
    get scope(): ScopeModuleHomeBase;
  }

  export interface ServiceSSR {
    /** @internal */
    get scope(): ScopeModuleHomeBase;
  }
}
/** service: end */
/** service: begin */
import { ServiceRouter } from '../bean/service.router.js';
import { ServiceSSR } from '../bean/service.ssr.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-base.service.router': ServiceRouter;
    'home-base.service.sSR': ServiceSSR;
  }
}
/** service: end */
/** controller: begin */
export * from '../component/page/controller.jsx';
export * from '../page/errorNotFound/controller.jsx';

import 'zova';
declare module 'zova' {}
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
/** controller: end */
/** controller: begin */
import { ControllerPage } from '../component/page/controller.jsx';
import { ControllerPageErrorNotFound } from '../page/errorNotFound/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-base.controller.page': ControllerPage;
    'home-base.controller.pageErrorNotFound': ControllerPageErrorNotFound;
  }
}
/** controller: end */
/** pages: begin */

export * from '../routes.js';

import 'zova';
declare module 'zova' {
  export interface IPagePathRecord {
    '/home/base//:catchAll(.*)*': undefined;
  }
  export interface IPageNameRecord {}
}
export const pagePathSchemas = {};
export const pageNameSchemas = {};
declare module 'zova-module-home-base' {}
/** pages: end */

import { RequiredSome } from 'zova';
/** components: begin */
import { ControllerPageEmits, ControllerPageSlots } from '../component/page/controller.jsx';
export { default as ZPage } from './component/page.vue';
import { default as ZPage } from './component/page.vue';
export const components = {
  page: ZPage,
};
import 'zova';
declare module 'zova' {
  export interface IComponentRecord {
    'home-base:page': ControllerPage;
  }
}
declare module 'zova-module-home-base' {
  export interface ControllerPageProps {
    controllerRef?: (ref: ControllerPage) => void;
    slots?: ControllerPageSlots;
  }

  export interface ControllerPage {
    $props: RequiredSome<ControllerPageProps, keyof typeof ControllerPage.$propsDefault>;
    $emit: ControllerPageEmits;
    $slots: ControllerPageSlots;
  }
}
/** components: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};
/** locale: end */
/** monkey: begin */
export * from '../monkey.js';
/** monkey: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil, TypeModuleLocales, TypeLocaleBase } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleHomeBase extends BeanScopeBase {}

export interface ScopeModuleHomeBase {
  util: BeanScopeUtil;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

import 'zova';
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
