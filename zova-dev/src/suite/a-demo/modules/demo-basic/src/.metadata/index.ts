import type { BeanScopeUtil } from 'zova';
/** locale: end */
/** scope: begin */
import { BeanScopeBase, TypeLocaleBase, TypeModuleLocales } from 'zova';
import { IDecoratorAopOptions } from 'zova-module-a-bean';

import { Scope } from 'zova-module-a-bean';
import { TypePagePathSchema } from 'zova-module-a-router';
import { AopHome3 } from '../bean/aop.home3.jsx';
/** aop: end */
/** aop: begin */
import { AopHome } from '../bean/aop.home.jsx';
/** store: end */
/** store: begin */
import { StoreCounter } from '../bean/store.counter.js';
/** theme: end */
/** theme: begin */
import { ThemeOrange } from '../bean/theme.orange.js';
/** controller: end */
/** controller: begin */
import { ControllerCard } from '../component/card/controller.jsx';
/** theme: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
import { ControllerPageComponent } from '../page/component/controller.jsx';
import { ControllerPageLegacy } from '../page/legacy/controller.jsx';
import { ControllerPageLocale } from '../page/locale/controller.jsx';
import { ControllerPagePinia } from '../page/pinia/controller.jsx';
import { ControllerPageRouteParams } from '../page/routeParams/controller.jsx';
import { ControllerPageRouteQuery } from '../page/routeQuery/controller.jsx';
import { ControllerPageRouteQueryB } from '../page/routeQueryB/controller.jsx';
import { ControllerPageState } from '../page/state/controller.jsx';
import { ControllerPageStyle } from '../page/style/controller.jsx';
import { ControllerPageToolOne } from '../page/toolOne/controller.jsx';
import { ZCard } from './component/card.js';

import { NSControllerPageRouteParams } from './page/routeParams.js';
import { NSControllerPageRouteQuery } from './page/routeQuery.js';
import { NSControllerPageRouteQueryB } from './page/routeQueryB.js';
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

export * from '../bean/aop.home3.jsx';
declare module 'zova' {

}
declare module 'zova-module-demo-basic' {

  export interface StoreCounter {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }
}
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'demo-basic.store.counter': StoreCounter;
  }
}
/** components: end */
/** aop: begin */
export * from '../bean/aop.home.jsx';
/** store: begin */
export * from '../bean/store.counter.js';
/** aop: end */
/** theme: begin */
export * from '../bean/theme.orange.js';
/** store: end */
/** controller: begin */
export * from '../component/card/controller.jsx';
export * from '../page/component/controller.jsx';
export * from '../page/legacy/controller.jsx';
export * from '../page/locale/controller.jsx';
export * from '../page/pinia/controller.jsx';
export * from '../page/routeParams/controller.jsx';
export * from '../page/routeQuery/controller.jsx';
export * from '../page/routeQueryB/controller.jsx';
declare module 'zova' {

}
declare module 'zova-module-demo-basic' {

  export interface ControllerCard {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }

  export interface ControllerPageComponent {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }

  export interface ControllerPageLegacy {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }

  export interface ControllerPageLocale {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }

  export interface ControllerPagePinia {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }

  export interface ControllerPageRouteParams {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }

  export interface ControllerPageRouteQuery {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }

  export interface ControllerPageRouteQueryB {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }

  export interface ControllerPageState {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }

  export interface ControllerPageStyle {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }

  export interface ControllerPageToolOne {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }
}
declare module 'zova' {
  export interface IBeanRecordLocal {
    'demo-basic.controller.card': ControllerCard;
    'demo-basic.controller.pageComponent': ControllerPageComponent;
    'demo-basic.controller.pageLegacy': ControllerPageLegacy;
    'demo-basic.controller.pageLocale': ControllerPageLocale;
    'demo-basic.controller.pagePinia': ControllerPagePinia;
    'demo-basic.controller.pageRouteParams': ControllerPageRouteParams;
    'demo-basic.controller.pageRouteQuery': ControllerPageRouteQuery;
    'demo-basic.controller.pageRouteQueryB': ControllerPageRouteQueryB;
    'demo-basic.controller.pageState': ControllerPageState;
    'demo-basic.controller.pageStyle': ControllerPageStyle;
    'demo-basic.controller.pageToolOne': ControllerPageToolOne;
  }
}
export * from '../page/state/controller.jsx';
export * from '../page/style/controller.jsx';
export * from '../page/toolOne/controller.jsx';
export * from '../routes.js';
/** components: begin */
export * from './component/card.js';
/** controller: end */
/** pages: begin */
export * from './page/component.js';
export * from './page/legacy.js';
export * from './page/locale.js';
export * from './page/pinia.js';
export * from './page/routeParams.js';
export * from './page/routeQuery.js';
declare module 'zova-module-a-router' {
  export interface IPagePathRecord {
    '/demo/basic/component': TypePagePathSchema<'/demo/basic/component', undefined>;
    '/demo/basic/legacy': TypePagePathSchema<'/demo/basic/legacy', undefined>;
    '/demo/basic/locale': TypePagePathSchema<'/demo/basic/locale', undefined>;
    '/demo/basic/pinia': TypePagePathSchema<'/demo/basic/pinia', undefined>;
    '/demo/basic/routeParams/:_string_': TypePagePathSchema<'/demo/basic/routeParams:_id?_', NSControllerPageRouteParams.QueryInput>;
    '/demo/basic/routeParams/:id?': TypePagePathSchema<`/demo/basic/routeParams/${string}`, NSControllerPageRouteParams.QueryInput>;
    '/demo/basic/routeQuery': TypePagePathSchema<'/demo/basic/routeQuery', NSControllerPageRouteQuery.QueryInput>;
    '/demo/basic/routeQueryB': TypePagePathSchema<'/demo/basic/routeQueryB', NSControllerPageRouteQueryB.QueryInput>;
    '/demo/basic/state': TypePagePathSchema<'/demo/basic/state', undefined>;
    '/demo/basic/style': TypePagePathSchema<'/demo/basic/style', undefined>;
    '/demo/basic/toolOne': TypePagePathSchema<'/demo/basic/toolOne', undefined>;
  }
  export interface IPageNameRecord {
    'demo-basic:routeParams': undefined;
  }
}
export const pagePathSchemas = {
  '/demo/basic/routeQuery': {
    query: NSControllerPageRouteQuery.querySchema,
  },
  '/demo/basic/routeQueryB': {
    query: NSControllerPageRouteQueryB.querySchema,
  },
};
export const pageNameSchemas = {
  'demo-basic:routeParams': {
    params: NSControllerPageRouteParams.paramsSchema,
    query: NSControllerPageRouteParams.querySchema,
  },
};
declare module 'zova-module-demo-basic' {
  export interface ControllerPageRouteParams {
    $params: NSControllerPageRouteParams.ParamsOutput;
    $query: NSControllerPageRouteParams.QueryOutput;
  }
  export interface ControllerPageRouteQuery {
    $params: NSControllerPageRouteQuery.ParamsOutput;
    $query: NSControllerPageRouteQuery.QueryOutput;
  }
  export interface ControllerPageRouteQueryB {
    $params: NSControllerPageRouteQueryB.ParamsOutput;
    $query: NSControllerPageRouteQueryB.QueryOutput;
  }
}
/** pages: end */

export * from './page/routeQueryB.js';
export const components = {
  card: ZCard,
};
declare module 'zova' {
  export interface IComponentRecord {
    'demo-basic:card': ControllerCard;
  }
}
export * from './page/state.js';
export * from './page/style.js';
declare module 'zova-module-a-bean' {

  export interface IAopRecord {
    'demo-basic:home': IDecoratorAopOptions;
    'demo-basic:home3': IDecoratorAopOptions;
  }

}
declare module 'zova-module-demo-basic' {

  export interface AopHome {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }

  export interface AopHome3 {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }
}
declare module 'zova' {
  export interface IBeanRecordLocal {
    'demo-basic.aop.home': AopHome;
    'demo-basic.aop.home3': AopHome3;
  }
}
export * from './page/toolOne.js';
declare module 'zova' {

}
declare module 'zova-module-demo-basic' {

  export interface ThemeOrange {
    /** @internal */
    get scope(): ScopeModuleDemoBasic;
  }
}
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'demo-basic.theme.orange': ThemeOrange;
  }
}
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};

@Scope()
export class ScopeModuleDemoBasic extends BeanScopeBase {}

export interface ScopeModuleDemoBasic {
  util: BeanScopeUtil;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

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
