/** theme: begin */
export * from '../bean/theme.orange.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-demo-basic' {
  export interface ThemeOrange {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }
}
/** theme: end */
/** theme: begin */
import { ThemeOrange } from '../bean/theme.orange.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'demo-basic.theme.orange': ThemeOrange;
  }
}
/** theme: end */
import { RequiredSome } from 'zova';
/** components: begin */
export * from '../component/card/controller.js';
import { ControllerCard, ControllerCardEmits, ControllerCardSlots } from '../component/card/controller.js';
export { default as ZCard } from '../component/card/index.vue';
import ZCard from '../component/card/index.vue';
export const components = {
  card: ZCard,
};
import 'zova';
declare module 'zova' {
  export interface IComponentRecord {
    'demo-basic:card': ControllerCard;
  }
}
declare module 'zova-module-demo-basic' {
  export interface ControllerCardProps {
    controllerRef?: (ref: ControllerCard) => void;
    slots?: ControllerCardSlots;
  }

  export interface ControllerCard {
    $props: RequiredSome<ControllerCardProps, keyof typeof ControllerCard.$propsDefault>;
    $emit: ControllerCardEmits;
    $slots: ControllerCardSlots;
  }
}
/** components: end */
/** pages: begin */
export * from '../page/component/controller.js';
export * from '../page/legacy/controller.js';
export * from '../page/locale/controller.js';
export * from '../page/pinia/controller.js';
export * from '../page/routeParams/controller.js';
export * from '../page/routeQuery/controller.js';
export * from '../page/routeQuery2/controller.js';
export * from '../page/state/controller.js';
export * from '../page/style/controller.js';
import { ControllerPageLocale } from '../page/locale/controller.js';
import { ControllerPagePinia } from '../page/pinia/controller.js';
import { ControllerPageRouteParams } from '../page/routeParams/controller.js';
import { ControllerPageRouteQuery } from '../page/routeQuery/controller.js';
import { ControllerPageRouteQuery2 } from '../page/routeQuery2/controller.js';
import { ControllerPageStyle } from '../page/style/controller.js';
export * from '../routes.js';
import { TypePageParamsQuery } from 'zova';
import 'zova';
declare module 'zova' {
  export interface IPagePathRecord {
    '/demo/basic/component': undefined;
    '/demo/basic/legacy': undefined;
    '/demo/basic/locale': ControllerPageLocale.QueryInput;
    '/demo/basic/pinia': ControllerPagePinia.QueryInput;
    '/demo/basic/routeQuery': ControllerPageRouteQuery.QueryInput;
    '/demo/basic/routeQuery2': ControllerPageRouteQuery2.QueryInput;
    '/demo/basic/state': undefined;
    '/demo/basic/style': ControllerPageStyle.QueryInput;
  }
  export interface IPageNameRecord {
    'demo-basic:routeParams': TypePageParamsQuery<
      ControllerPageRouteParams.QueryInput,
      ControllerPageRouteParams.ParamsInput
    >;
  }
}
export const pagePathSchemas = {
  '/demo/basic/locale': {
    query: ControllerPageLocale.querySchema,
  },
  '/demo/basic/pinia': {
    query: ControllerPagePinia.querySchema,
  },
  '/demo/basic/routeQuery': {
    query: ControllerPageRouteQuery.querySchema,
  },
  '/demo/basic/routeQuery2': {
    query: ControllerPageRouteQuery2.querySchema,
  },
  '/demo/basic/style': {
    query: ControllerPageStyle.querySchema,
  },
};
export const pageNameSchemas = {
  'demo-basic:routeParams': {
    params: ControllerPageRouteParams.paramsSchema,
    query: ControllerPageRouteParams.querySchema,
  },
};
/** pages: end */
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
export class ScopeModuleDemoBasic extends BeanScopeBase {}

export interface ScopeModuleDemoBasic {
  util: BeanScopeUtil;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'demo-basic': ScopeModuleDemoBasic;
  }

  export interface IBeanScopeLocale {
    'demo-basic': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `demo-basic::${K}` {
  return `demo-basic::${key}`;
}
/** scope: end */
