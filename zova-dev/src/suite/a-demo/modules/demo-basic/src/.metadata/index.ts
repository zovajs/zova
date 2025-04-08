import { TypePageParamsQuery } from 'zova';
import { RequiredSome } from 'zova';
/** locale: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil, TypeLocaleBase, TypeModuleLocales } from 'zova';

import { IDecoratorAopOptions } from 'zova-module-a-bean';
import { Scope } from 'zova-module-a-bean';
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
/** components: begin */
import { ControllerCardEmits, ControllerCardSlots } from '../component/card/controller.jsx';
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
/** pages: end */

import { ControllerPageState } from '../page/state/controller.jsx';
import { ControllerPageStyle } from '../page/style/controller.jsx';
import ZCard from './component/card.vue';
/** controller: end */
/** pages: begin */
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
  }
}
export * from '../page/routeQueryB/controller.jsx';
declare module 'zova' {
  export interface IPagePathRecord {
    '/demo/basic/component': undefined;
    '/demo/basic/legacy': undefined;
    '/demo/basic/locale': undefined;
    '/demo/basic/pinia': undefined;
    '/demo/basic/routeQuery': NSControllerPageRouteQuery.QueryInput;
    '/demo/basic/routeQueryB': NSControllerPageRouteQueryB.QueryInput;
    '/demo/basic/state': undefined;
    '/demo/basic/style': undefined;
  }
  export interface IPageNameRecord {
    'demo-basic:routeParams': TypePageParamsQuery<NSControllerPageRouteParams.QueryInput, NSControllerPageRouteParams.ParamsInput>;
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
export * from '../page/state/controller.jsx';
export const components = {
  card: ZCard,
};
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
export * from '../page/style/controller.jsx';
export * from '../routes.js';
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
export { default as ZCard } from './component/card.vue';
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
