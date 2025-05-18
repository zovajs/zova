import type { BeanScopeUtil } from 'zova';
/** locale: end */
/** scope: begin */
import { BeanScopeBase, TypeLocaleBase, TypeModuleLocales } from 'zova';
import { Scope } from 'zova-module-a-bean';
/** controller: end */
/** controller: begin */
import { ControllerTable } from '../component/table/controller.jsx';
/** render: end */
/** render: begin */
import { RenderTable } from '../component/table/render.jsx';

/** render: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
import { ZTable } from './component/table.js';
/** controller: begin */
import 'zova';
import 'zova';
import 'zova';
import 'zova';
import 'zova';

import 'zova';

export * from '../component/table/controller.jsx';
declare module 'zova' {

}
declare module 'zova-module-devui-table' {

  export interface ControllerTable {
    /** @internal */
    get scope(): ScopeModuleDevuiTable;
  }
}
declare module 'zova' {
  export interface IBeanRecordLocal {
    'devui-table.controller.table': ControllerTable;
  }
}
/** controller: end */

/** components: end */
/** render: begin */
export * from '../component/table/render.jsx';
export const components = {
  table: ZTable,
};
declare module 'zova' {
  export interface IComponentRecord {
    'devui-table:table': ControllerTable;
  }
  export interface IZovaComponentRecord {
    'devui-table:table': typeof ZTable;
  }
}
/** components: begin */
export * from './component/table.js';
declare module 'zova' {

}
declare module 'zova-module-devui-table' {

  export interface RenderTable {
    /** @internal */
    get scope(): ScopeModuleDevuiTable;
  }
}
declare module 'zova' {
  export interface IBeanRecordLocal {
    'devui-table.render.table': RenderTable;
  }
}
export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};

@Scope()
export class ScopeModuleDevuiTable extends BeanScopeBase {}

export interface ScopeModuleDevuiTable {
  util: BeanScopeUtil;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

declare module 'zova' {
  export interface IBeanScopeRecord {
    'devui-table': ScopeModuleDevuiTable;
  }

  export interface IBeanScopeLocale {
    'devui-table': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `devui-table::${K}` {
  return `devui-table::${key}`;
}
/** scope: end */
