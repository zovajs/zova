import type { BeanScopeUtil } from 'zova';
/** locale: end */
/** scope: begin */
import { BeanScopeBase, TypeLocaleBase, TypeModuleLocales } from 'zova';
import { Scope } from 'zova-module-a-bean';
/** controller: end */
/** controller: begin */
import { ControllerRestTable } from '../component/restTable/controller.jsx';
/** render: end */
/** render: begin */
import { RenderRestTable } from '../component/restTable/render.jsx';

/** render: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
import { ZRestTable } from './component/restTable.js';
/** controller: begin */
import 'zova';
import 'zova';
import 'zova';
import 'zova';
import 'zova';

import 'zova';

export * from '../component/restTable/controller.jsx';
declare module 'zova' {

}
declare module 'zova-module-devui-resttable' {

  export interface ControllerRestTable {
    /** @internal */
    get scope(): ScopeModuleDevuiResttable;
  }
}
declare module 'zova' {
  export interface IBeanRecordLocal {
    'devui-resttable.controller.restTable': ControllerRestTable;
  }
}
/** controller: end */

/** components: end */
/** render: begin */
export * from '../component/restTable/render.jsx';
export const components = {
  restTable: ZRestTable,
};
declare module 'zova' {
  export interface IComponentRecord {
    'devui-resttable:restTable': ControllerRestTable;
  }
}
/** components: begin */
export * from './component/restTable.js';
declare module 'zova' {

}
declare module 'zova-module-devui-resttable' {

  export interface RenderRestTable {
    /** @internal */
    get scope(): ScopeModuleDevuiResttable;
  }
}
declare module 'zova' {
  export interface IBeanRecordLocal {
    'devui-resttable.render.restTable': RenderRestTable;
  }
}
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};

@Scope()
export class ScopeModuleDevuiResttable extends BeanScopeBase {}

export interface ScopeModuleDevuiResttable {
  util: BeanScopeUtil;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

declare module 'zova' {
  export interface IBeanScopeRecord {
    'devui-resttable': ScopeModuleDevuiResttable;
  }

  export interface IBeanScopeLocale {
    'devui-resttable': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `devui-resttable::${K}` {
  return `devui-resttable::${key}`;
}
/** scope: end */
