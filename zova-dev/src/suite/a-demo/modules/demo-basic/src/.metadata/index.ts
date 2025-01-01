/** beans: begin */
export * from '../bean/store.counter.js';
export * from '../bean/theme.orange.js';
import { StoreCounter } from '../bean/store.counter.js';
import { ThemeOrange } from '../bean/theme.orange.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'demo-basic.store.counter': StoreCounter;
    'demo-basic.theme.orange': ThemeOrange;
  }
}
/** beans: end */
/** components: begin */
export { ControllerCard } from '../component/card/controller.js';
export * as NSControllerCard from '../component/card/controller.js';
import * as NSControllerCard from '../component/card/controller.js';
export { default as ZCard } from '../component/card/index.vue';
import ZCard from '../component/card/index.vue';
export const components = {
  card: ZCard,
};
import 'zova';
declare module 'zova' {
  export interface IComponentRecord {
    'demo-basic:card': NSControllerCard.ControllerCard;
  }
}
/** components: end */
/** pages: begin */
export * as NSControllerPageComponent from '../page/component/controller.js';
export * as NSControllerPageLegacy from '../page/legacy/controller.js';
export * as NSControllerPageLocale from '../page/locale/controller.js';
export * as NSControllerPagePinia from '../page/pinia/controller.js';
export * as NSControllerPageRouteParams from '../page/routeParams/controller.js';
export * as NSControllerPageRouteQuery from '../page/routeQuery/controller.js';
export * as NSControllerPageRouteQuery2 from '../page/routeQuery2/controller.js';
export * as NSControllerPageState from '../page/state/controller.js';
export * as NSControllerPageStyle from '../page/style/controller.js';
import * as NSControllerPageLocale from '../page/locale/controller.js';
import * as NSControllerPagePinia from '../page/pinia/controller.js';
import * as NSControllerPageRouteParams from '../page/routeParams/controller.js';
import * as NSControllerPageRouteQuery from '../page/routeQuery/controller.js';
import * as NSControllerPageRouteQuery2 from '../page/routeQuery2/controller.js';
import * as NSControllerPageStyle from '../page/style/controller.js';
export * from '../routes.js';
import { TypePageParamsQuery } from 'zova';
import 'zova';
declare module 'zova' {
  export interface IPagePathRecord {
    '/demo/basic/component': undefined;
    '/demo/basic/legacy': undefined;
    '/demo/basic/locale': NSControllerPageLocale.QueryInput;
    '/demo/basic/pinia': NSControllerPagePinia.QueryInput;
    '/demo/basic/routeQuery': NSControllerPageRouteQuery.QueryInput;
    '/demo/basic/routeQuery2': NSControllerPageRouteQuery2.QueryInput;
    '/demo/basic/state': undefined;
    '/demo/basic/style': NSControllerPageStyle.QueryInput;
  }
  export interface IPageNameRecord {
    'demo-basic:routeParams': TypePageParamsQuery<
      NSControllerPageRouteParams.QueryInput,
      NSControllerPageRouteParams.ParamsInput
    >;
  }
}
export const pagePathSchemas = {
  '/demo/basic/locale': {
    query: NSControllerPageLocale.QuerySchema,
  },
  '/demo/basic/pinia': {
    query: NSControllerPagePinia.QuerySchema,
  },
  '/demo/basic/routeQuery': {
    query: NSControllerPageRouteQuery.QuerySchema,
  },
  '/demo/basic/routeQuery2': {
    query: NSControllerPageRouteQuery2.QuerySchema,
  },
  '/demo/basic/style': {
    query: NSControllerPageStyle.QuerySchema,
  },
};
export const pageNameSchemas = {
  'demo-basic:routeParams': {
    params: NSControllerPageRouteParams.ParamsSchema,
    query: NSControllerPageRouteParams.QuerySchema,
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
import { BeanScopeBase, Scope, TypeLocaleBase, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleDemoBasic extends BeanScopeBase {}

export interface ScopeModuleDemoBasic
  extends TypeModuleResource<never, never, (typeof locales)[TypeLocaleBase], never, never> {}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'demo-basic': ScopeModuleDemoBasic;
  }

  export interface IBeanScopeLocale {
    'demo-basic': (typeof locales)[TypeLocaleBase];
  }
}
/** scope: end */
/** scope module: begin */
export * from '../bean/store.counter.js';
export * from '../bean/theme.orange.js';
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
declare module 'zova-module-demo-basic' {
  export interface StoreCounter {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }

  export interface ThemeOrange {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }

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
/** scope module: end */
