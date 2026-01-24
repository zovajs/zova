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
/** tableCell: begin */
export * from '../bean/tableCell.actionOperationsRow.jsx';
export * from '../bean/tableCell.actionView.jsx';
import { ITableCellOptionsActionOperationsRow } from '../bean/tableCell.actionOperationsRow.jsx';
import { ITableCellOptionsActionView } from '../bean/tableCell.actionView.jsx';
import 'zova-module-a-table';
declare module 'zova-module-a-table' {
  
    export interface ITableCellRecord {
      'devui-table:actionOperationsRow': ITableCellOptionsActionOperationsRow;
'devui-table:actionView': ITableCellOptionsActionView;
    }

  
}
declare module 'zova-module-devui-table' {
  
        export interface TableCellActionOperationsRow {
          /** @internal */
          get scope(): ScopeModuleDevuiTable;
        }

        export interface TableCellActionOperationsRow {
          get $beanFullName(): 'devui-table.tableCell.actionOperationsRow';
          get $onionName(): 'devui-table:actionOperationsRow';
          get $onionOptions(): ITableCellOptionsActionOperationsRow;
        }

        export interface TableCellActionView {
          /** @internal */
          get scope(): ScopeModuleDevuiTable;
        }

        export interface TableCellActionView {
          get $beanFullName(): 'devui-table.tableCell.actionView';
          get $onionName(): 'devui-table:actionView';
          get $onionOptions(): ITableCellOptionsActionView;
        } 
}
/** tableCell: end */
/** tableCell: begin */
import { TableCellActionOperationsRow } from '../bean/tableCell.actionOperationsRow.jsx';
import { TableCellActionView } from '../bean/tableCell.actionView.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'devui-table.tableCell.actionOperationsRow': TableCellActionOperationsRow;
'devui-table.tableCell.actionView': TableCellActionView;
  }
}
/** tableCell: end */
/** locale: begin */
import { locales } from './locales.js';
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
