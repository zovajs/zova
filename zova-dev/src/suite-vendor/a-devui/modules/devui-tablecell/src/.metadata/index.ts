/* eslint-disable */
/** tableCell: begin */
export * from '../bean/tableCell.actionOperationsRow.jsx';
export * from '../bean/tableCell.actionView.jsx';
import { ITableCellOptionsActionOperationsRow } from '../bean/tableCell.actionOperationsRow.jsx';
import { ITableCellOptionsActionView } from '../bean/tableCell.actionView.jsx';
import 'zova-module-a-table';
declare module 'zova-module-a-table' {
  
    export interface ITableCellRecord {
      'devui-tablecell:actionOperationsRow': ITableCellOptionsActionOperationsRow;
'devui-tablecell:actionView': ITableCellOptionsActionView;
    }

  
}
declare module 'zova-module-devui-tablecell' {
  
        export interface TableCellActionOperationsRow {
          /** @internal */
          get scope(): ScopeModuleDevuiTablecell;
        }

        export interface TableCellActionOperationsRow {
          get $beanFullName(): 'devui-tablecell.tableCell.actionOperationsRow';
          get $onionName(): 'devui-tablecell:actionOperationsRow';
          get $onionOptions(): ITableCellOptionsActionOperationsRow;
        }

        export interface TableCellActionView {
          /** @internal */
          get scope(): ScopeModuleDevuiTablecell;
        }

        export interface TableCellActionView {
          get $beanFullName(): 'devui-tablecell.tableCell.actionView';
          get $onionName(): 'devui-tablecell:actionView';
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
    'devui-tablecell.tableCell.actionOperationsRow': TableCellActionOperationsRow;
'devui-tablecell.tableCell.actionView': TableCellActionView;
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
export class ScopeModuleDevuiTablecell extends BeanScopeBase {}

export interface ScopeModuleDevuiTablecell {
  util: BeanScopeUtil;
locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'devui-tablecell': ScopeModuleDevuiTablecell;
  }
  
  

  export interface IBeanScopeLocale {
    'devui-tablecell': (typeof locales)[TypeLocaleBase];
  }

  
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `devui-tablecell::${K}` {
  return `devui-tablecell::${key}`;
}  
/** scope: end */
