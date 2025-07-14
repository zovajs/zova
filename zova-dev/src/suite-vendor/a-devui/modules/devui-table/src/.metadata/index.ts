/* eslint-disable */
/** controller: begin */
export * from '../component/table/controller.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-devui-table' {
  
        export interface ControllerTable {
          /** @internal */
          get scope(): ScopeModuleDevuiTable;
        } 
}
/** controller: end */
/** controller: begin */
import { ControllerTable } from '../component/table/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'devui-table.controller.table': ControllerTable;
  }
}
/** controller: end */

/** components: begin */
export * from './component/table.js';
import { ZTable } from './component/table.js';
export const components = {
  'table': ZTable,
};
import 'zova';
declare module 'zova' {
export interface IComponentRecord {
  'devui-table:table': ControllerTable;
}
export interface IZovaComponentRecord {
  'devui-table:table': typeof ZTable;
}
}
/** components: end */
/** render: begin */
export * from '../component/table/render.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-devui-table' {
  
        export interface RenderTable {
          /** @internal */
          get scope(): ScopeModuleDevuiTable;
        } 
}
/** render: end */
/** render: begin */
import { RenderTable } from '../component/table/render.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'devui-table.render.table': RenderTable;
  }
}
/** render: end */
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';
export const locales = {
  'en-us': locale_en_us,
'zh-cn': locale_zh_cn,
};
/** locale: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil, TypeModuleLocales, TypeLocaleBase } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleDevuiTable extends BeanScopeBase {}

export interface ScopeModuleDevuiTable {
  util: BeanScopeUtil;
locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

import 'zova';
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
