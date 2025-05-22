import type { BeanScopeUtil } from 'zova';
/** tableCellFormat: end */
/** scope: begin */
import { BeanScopeBase } from 'zova';
import { Scope } from 'zova-module-a-bean';
/** tableCellFormat: begin */
import { ITableCellFormatOptionsActionView } from '../bean/tableCellFormat.actionView.jsx';
/** tableCellFormat: end */
/** tableCellFormat: begin */
import { TableCellFormatActionView } from '../bean/tableCellFormat.actionView.jsx';
import 'zova';
import 'zova';

import 'zova';

export * from '../bean/tableCellFormat.actionView.jsx';
declare module 'zova-module-a-table' {

  export interface ITableCellFormatRecord {
    'devui-tableformat:actionView': ITableCellFormatOptionsActionView;
  }

}
declare module 'zova-module-devui-tableformat' {

  export interface TableCellFormatActionView {
    /** @internal */
    get scope(): ScopeModuleDevuiTableformat;
  }
}
declare module 'zova' {
  export interface IBeanRecordLocal {
    'devui-tableformat.tableCellFormat.actionView': TableCellFormatActionView;
  }
}

@Scope()
export class ScopeModuleDevuiTableformat extends BeanScopeBase {}

export interface ScopeModuleDevuiTableformat {
  util: BeanScopeUtil;
}

declare module 'zova' {
  export interface IBeanScopeRecord {
    'devui-tableformat': ScopeModuleDevuiTableformat;
  }

}

/** scope: end */
