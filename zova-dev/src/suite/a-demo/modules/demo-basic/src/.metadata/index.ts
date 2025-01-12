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
/** controller: begin */
export * from '../component/card/controller.jsx';
export * from '../page/component/controller.jsx';
export * from '../page/legacy/controller.jsx';
export * from '../page/locale/controller.jsx';
export * from '../page/pinia/controller.jsx';
export * from '../page/routeParams/controller.jsx';
export * from '../page/routeQuery/controller.jsx';
export * from '../page/routeQueryB/controller.jsx';
export * from '../page/state/controller.jsx';
export * from '../page/style/controller.jsx';

import 'zova';
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
/** controller: end */
/** controller: begin */
import { ControllerCard } from '../component/card/controller.jsx';
import { ControllerPageComponent } from '../page/component/controller.jsx';
import { ControllerPageLegacy } from '../page/legacy/controller.jsx';
import { ControllerPageLocale } from '../page/locale/controller.jsx';
import { ControllerPagePinia } from '../page/pinia/controller.jsx';
import { ControllerPageRouteParams } from '../page/routeParams/controller.jsx';
import { ControllerPageRouteQuery } from '../page/routeQuery/controller.jsx';
import { ControllerPageRouteQueryB } from '../page/routeQueryB/controller.jsx';
import { ControllerPageState } from '../page/state/controller.jsx';
import { ControllerPageStyle } from '../page/style/controller.jsx';
import 'zova';
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
export * from '../routes.js';
import { TypePageParamsQuery } from 'zova';
import { z } from 'zod';
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
import 'zova';
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
/** pages: end */

import { RequiredSome } from 'zova';
/** components: begin */
import { ControllerCardEmits, ControllerCardSlots } from '../component/card/controller.jsx';
export { default as ZCard } from './component/card.vue';
import { default as ZCard } from './component/card.vue';
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
/** aop: begin */
export * from '../bean/aop.home.jsx';
export * from '../bean/aop.home3.jsx';

import { IDecoratorAopOptions } from 'zova-module-a-bean';
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
/** aop: end */
/** aop: begin */
import { AopHome } from '../bean/aop.home.jsx';
import { AopHome3 } from '../bean/aop.home3.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'demo-basic.aop.home': AopHome;
    'demo-basic.aop.home3': AopHome3;
  }
}
/** aop: end */
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
