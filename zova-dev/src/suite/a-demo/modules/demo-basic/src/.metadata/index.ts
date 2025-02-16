import type { z } from 'zod';
/** locale: end */
/** scope: begin */
import type { BeanScopeUtil, TypeLocaleBase, TypeModuleLocales } from 'zova';
import type { TypePageParamsQuery } from 'zova';

import type { RequiredSome } from 'zova';
import type { IDecoratorAopOptions } from 'zova-module-a-bean';
import type { AopHome3 } from '../bean/aop.home3.jsx';

/** aop: end */
/** aop: begin */
import type { AopHome } from '../bean/aop.home.jsx';
/** store: end */
/** store: begin */
import type { StoreCounter } from '../bean/store.counter.js';
/** theme: end */
/** theme: begin */
import type { ThemeOrange } from '../bean/theme.orange.js';
/** controller: end */
/** controller: begin */
import type { ControllerCard } from '../component/card/controller.jsx';
/** components: begin */
import type { ControllerCardEmits, ControllerCardSlots } from '../component/card/controller.jsx';
import type { ControllerPageComponent } from '../page/component/controller.jsx';
import type { ControllerPageLegacy } from '../page/legacy/controller.jsx';
import type { ControllerPageLocale } from '../page/locale/controller.jsx';
import type { ControllerPagePinia } from '../page/pinia/controller.jsx';
import type { ControllerPageRouteParams } from '../page/routeParams/controller.jsx';
import type { ControllerPageRouteQuery } from '../page/routeQuery/controller.jsx';
import type { ControllerPageRouteQueryB } from '../page/routeQueryB/controller.jsx';
import type { ControllerPageState } from '../page/state/controller.jsx';
import type { ControllerPageStyle } from '../page/style/controller.jsx';
import { BeanScopeBase } from 'zova';
import { Scope } from 'zova-module-a-bean';
/** aop: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
/** pages: end */

/** controller: end */
/** pages: begin */
import {
  ControllerPageRouteParamsSchemaParams,
  ControllerPageRouteParamsSchemaQuery,
} from '../page/routeParams/controller.jsx';
import {
  ControllerPageRouteQuerySchemaParams,
  ControllerPageRouteQuerySchemaQuery,
} from '../page/routeQuery/controller.jsx';
import {
  ControllerPageRouteQueryBSchemaParams,
  ControllerPageRouteQueryBSchemaQuery,
} from '../page/routeQueryB/controller.jsx';
import { default as ZCard } from './component/card.vue';

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
declare module 'zova' {}
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
/** components: end */
/** aop: begin */
export * from '../bean/aop.home.jsx';
declare module 'zova' {}
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
/** theme: end */
/** store: begin */
export * from '../bean/store.counter.js';
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
declare module 'zova' {}
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
export * from '../page/state/controller.jsx';
export namespace NSControllerPageRouteParams {
  export const paramsSchema = ControllerPageRouteParamsSchemaParams;
  export type ParamsInput = z.input<typeof ControllerPageRouteParamsSchemaParams>;
  export type ParamsOutput = z.output<typeof ControllerPageRouteParamsSchemaParams>;

  export const querySchema = ControllerPageRouteParamsSchemaQuery;
  export type QueryInput = z.input<typeof ControllerPageRouteParamsSchemaQuery>;
  export type QueryOutput = z.output<typeof ControllerPageRouteParamsSchemaQuery>;
}
export namespace NSControllerPageRouteQuery {
  export const paramsSchema = ControllerPageRouteQuerySchemaParams;
  export type ParamsInput = z.input<typeof ControllerPageRouteQuerySchemaParams>;
  export type ParamsOutput = z.output<typeof ControllerPageRouteQuerySchemaParams>;

  export const querySchema = ControllerPageRouteQuerySchemaQuery;
  export type QueryInput = z.input<typeof ControllerPageRouteQuerySchemaQuery>;
  export type QueryOutput = z.output<typeof ControllerPageRouteQuerySchemaQuery>;
}
export namespace NSControllerPageRouteQueryB {
  export const paramsSchema = ControllerPageRouteQueryBSchemaParams;
  export type ParamsInput = z.input<typeof ControllerPageRouteQueryBSchemaParams>;
  export type ParamsOutput = z.output<typeof ControllerPageRouteQueryBSchemaParams>;

  export const querySchema = ControllerPageRouteQueryBSchemaQuery;
  export type QueryInput = z.input<typeof ControllerPageRouteQueryBSchemaQuery>;
  export type QueryOutput = z.output<typeof ControllerPageRouteQueryBSchemaQuery>;
}
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
    'demo-basic:routeParams': TypePageParamsQuery<
      NSControllerPageRouteParams.QueryInput,
      NSControllerPageRouteParams.ParamsInput
    >;
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
export * from '../page/style/controller.jsx';
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
export * from '../routes.js';
export { default as ZCard } from './component/card.vue';
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
