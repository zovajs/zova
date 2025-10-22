/* eslint-disable */
/** tableCellFormat: begin */
export * from '../bean/tableCellFormat.actionView.jsx';
import { ITableCellFormatOptionsActionView } from '../bean/tableCellFormat.actionView.jsx';
import 'zova-module-a-table';
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

        export interface TableCellFormatActionView {
          get $beanFullName(): 'devui-tableformat.tableCellFormat.actionView';
          get $onionName(): 'devui-tableformat:actionView';
          get $onionOptions(): ITableCellFormatOptionsActionView;
        } 
}
/** tableCellFormat: end */
/** tableCellFormat: begin */
import { TableCellFormatActionView } from '../bean/tableCellFormat.actionView.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'devui-tableformat.tableCellFormat.actionView': TableCellFormatActionView;
  }
}
/** tableCellFormat: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleDevuiTableformat extends BeanScopeBase {}

export interface ScopeModuleDevuiTableformat {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'devui-tableformat': ScopeModuleDevuiTableformat;
  }
  
  

  

  
}
  
/** scope: end */
