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
/** local: begin */
export * from '../component/card/controller.js';
export * from '../component/card/render.jsx';
export * from '../page/component/controller.js';
export * from '../page/component/render.jsx';
export * from '../page/legacy/controller.js';
export * from '../page/legacy/render.jsx';
export * from '../page/legacy/style.js';
export * from '../page/locale/controller.js';
export * from '../page/locale/render.jsx';
export * from '../page/pinia/controller.js';
export * from '../page/pinia/render.jsx';
export * from '../page/pinia/style.js';
export * from '../page/routeParams/controller.js';
export * from '../page/routeParams/render.jsx';
export * from '../page/routeParams/style.js';
export * from '../page/routeQuery/controller.js';
export * from '../page/routeQuery/render.jsx';
export * from '../page/routeQuery/style.js';
export * from '../page/routeQuery2/controller.js';
export * from '../page/routeQuery2/render.jsx';
export * from '../page/routeQuery2/style.js';
export * from '../page/state/controller.js';
export * from '../page/state/render.jsx';
export * from '../page/style/controller.js';
export * from '../page/style/render.jsx';
export * from '../page/style/style.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-demo-basic' {
  export interface ControllerCard {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }

  export interface RenderCard {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }

  export interface ControllerPageComponent {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }

  export interface RenderComponent {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }

  export interface ControllerPageLegacy {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }

  export interface RenderLegacy {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }

  export interface StyleLegacy {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }

  export interface ControllerPageLocale {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }

  export interface RenderLocale {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }

  export interface ControllerPagePinia {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }

  export interface RenderPinia {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }

  export interface StylePinia {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }

  export interface ControllerPageRouteParams {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }

  export interface RenderRouteParams {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }

  export interface StyleRouteParams {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }

  export interface ControllerPageRouteQuery {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }

  export interface RenderRouteQuery {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }

  export interface StyleRouteQuery {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }

  export interface ControllerPageRouteQuery2 {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }

  export interface RenderRouteQuery2 {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }

  export interface StyleRouteQuery2 {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }

  export interface ControllerPageState {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }

  export interface RenderState {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }

  export interface ControllerPageStyle {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }

  export interface RenderStyle {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }

  export interface StyleStyle {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }
}
/** local: end */
/** local: begin */
import { ControllerCard } from '../component/card/controller.js';
import { RenderCard } from '../component/card/render.jsx';
import { ControllerPageComponent } from '../page/component/controller.js';
import { RenderComponent } from '../page/component/render.jsx';
import { ControllerPageLegacy } from '../page/legacy/controller.js';
import { RenderLegacy } from '../page/legacy/render.jsx';
import { StyleLegacy } from '../page/legacy/style.js';
import { ControllerPageLocale } from '../page/locale/controller.js';
import { RenderLocale } from '../page/locale/render.jsx';
import { ControllerPagePinia } from '../page/pinia/controller.js';
import { RenderPinia } from '../page/pinia/render.jsx';
import { StylePinia } from '../page/pinia/style.js';
import { ControllerPageRouteParams } from '../page/routeParams/controller.js';
import { RenderRouteParams } from '../page/routeParams/render.jsx';
import { StyleRouteParams } from '../page/routeParams/style.js';
import { ControllerPageRouteQuery } from '../page/routeQuery/controller.js';
import { RenderRouteQuery } from '../page/routeQuery/render.jsx';
import { StyleRouteQuery } from '../page/routeQuery/style.js';
import { ControllerPageRouteQuery2 } from '../page/routeQuery2/controller.js';
import { RenderRouteQuery2 } from '../page/routeQuery2/render.jsx';
import { StyleRouteQuery2 } from '../page/routeQuery2/style.js';
import { ControllerPageState } from '../page/state/controller.js';
import { RenderState } from '../page/state/render.jsx';
import { ControllerPageStyle } from '../page/style/controller.js';
import { RenderStyle } from '../page/style/render.jsx';
import { StyleStyle } from '../page/style/style.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'demo-basic.local.controllerCard': ControllerCard;
    'demo-basic.local.renderCard': RenderCard;
    'demo-basic.local.controllerPageComponent': ControllerPageComponent;
    'demo-basic.local.renderComponent': RenderComponent;
    'demo-basic.local.controllerPageLegacy': ControllerPageLegacy;
    'demo-basic.local.renderLegacy': RenderLegacy;
    'demo-basic.local.styleLegacy': StyleLegacy;
    'demo-basic.local.controllerPageLocale': ControllerPageLocale;
    'demo-basic.local.renderLocale': RenderLocale;
    'demo-basic.local.controllerPagePinia': ControllerPagePinia;
    'demo-basic.local.renderPinia': RenderPinia;
    'demo-basic.local.stylePinia': StylePinia;
    'demo-basic.local.controllerPageRouteParams': ControllerPageRouteParams;
    'demo-basic.local.renderRouteParams': RenderRouteParams;
    'demo-basic.local.styleRouteParams': StyleRouteParams;
    'demo-basic.local.controllerPageRouteQuery': ControllerPageRouteQuery;
    'demo-basic.local.renderRouteQuery': RenderRouteQuery;
    'demo-basic.local.styleRouteQuery': StyleRouteQuery;
    'demo-basic.local.controllerPageRouteQuery2': ControllerPageRouteQuery2;
    'demo-basic.local.renderRouteQuery2': RenderRouteQuery2;
    'demo-basic.local.styleRouteQuery2': StyleRouteQuery2;
    'demo-basic.local.controllerPageState': ControllerPageState;
    'demo-basic.local.renderState': RenderState;
    'demo-basic.local.controllerPageStyle': ControllerPageStyle;
    'demo-basic.local.renderStyle': RenderStyle;
    'demo-basic.local.styleStyle': StyleStyle;
  }
}
/** local: end */
/** store: begin */
export * from '../bean/store.counter.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-demo-basic' {
  export interface StoreCounter {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }
}
/** store: end */
/** store: begin */
import { StoreCounter } from '../bean/store.counter.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'demo-basic.store.counter': StoreCounter;
  }
}
/** store: end */
import { RequiredSome } from 'zova';
/** components: begin */
export * from '../component/card/controller.js';
import { ControllerCardEmits, ControllerCardSlots } from '../component/card/controller.js';
export { default as ZCard } from '../component/card/index.vue';
import { default as ZCard } from '../component/card/index.vue';
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
