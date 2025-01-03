/** style: begin */
export * from '../bean/style.default.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-home-base' {
  export interface StyleDefault {
    /** @internal */
    get scope(): ScopeModuleHomeBase;
  }
}
/** style: end */
/** style: begin */
import { StyleDefault } from '../bean/style.default.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'home-base.style.default': StyleDefault;
  }
}
/** style: end */
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
/** local: begin */
export * from '../bean/local.router.js';
export * from '../bean/local.ssr.js';
export * from '../component/page/controller.js';
export * from '../component/page/render.jsx';
export * from '../component/page/style.js';
export * from '../page/errorNotFound/controller.js';
export * from '../page/errorNotFound/render.jsx';
export * from '../page/errorNotFound/style.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-home-base' {
  export interface LocalRouter {
    /** @internal */
    get scope(): ScopeModuleHomeBase;
  }

  export interface LocalSSR {
    /** @internal */
    get scope(): ScopeModuleHomeBase;
  }

  export interface ControllerPage {
    /** @internal */
    get scope(): ScopeModuleHomeBase;
  }

  export interface RenderPage {
    /** @internal */
    get scope(): ScopeModuleHomeBase;
  }

  export interface StylePage {
    /** @internal */
    get scope(): ScopeModuleHomeBase;
  }

  export interface ControllerPageErrorNotFound {
    /** @internal */
    get scope(): ScopeModuleHomeBase;
  }

  export interface RenderErrorNotFound {
    /** @internal */
    get scope(): ScopeModuleHomeBase;
  }

  export interface StyleErrorNotFound {
    /** @internal */
    get scope(): ScopeModuleHomeBase;
  }
}
/** local: end */
/** local: begin */
import { LocalRouter } from '../bean/local.router.js';
import { LocalSSR } from '../bean/local.ssr.js';
import { ControllerPage } from '../component/page/controller.js';
import { RenderPage } from '../component/page/render.jsx';
import { StylePage } from '../component/page/style.js';
import { ControllerPageErrorNotFound } from '../page/errorNotFound/controller.js';
import { RenderErrorNotFound } from '../page/errorNotFound/render.jsx';
import { StyleErrorNotFound } from '../page/errorNotFound/style.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-base.local.router': LocalRouter;
    'home-base.local.sSR': LocalSSR;
    'home-base.local.controllerPage': ControllerPage;
    'home-base.local.renderPage': RenderPage;
    'home-base.local.stylePage': StylePage;
    'home-base.local.controllerPageErrorNotFound': ControllerPageErrorNotFound;
    'home-base.local.renderErrorNotFound': RenderErrorNotFound;
    'home-base.local.styleErrorNotFound': StyleErrorNotFound;
  }
}
/** local: end */
import { RequiredSome } from 'zova';
/** components: begin */
export * from '../component/page/controller.js';
import { ControllerPage, ControllerPageEmits, ControllerPageSlots } from '../component/page/controller.js';
export { default as ZPage } from '../component/page/index.vue';
import ZPage from '../component/page/index.vue';
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
/** pages: begin */
export * from '../page/errorNotFound/controller.js';

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
/** pages: end */
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
