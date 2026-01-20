/* eslint-disable */
/** tableCell: begin */
export * from '../bean/tableCell.actionView.jsx';
import { ITableCellOptionsActionView } from '../bean/tableCell.actionView.jsx';
import 'zova-module-a-table';
declare module 'zova-module-a-table' {
  
    export interface ITableCellRecord {
      'devui-tablecell:actionView': ITableCellOptionsActionView;
    }

  
}
declare module 'zova-module-devui-tablecell' {
  
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
import { TableCellActionView } from '../bean/tableCell.actionView.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'devui-tablecell.tableCell.actionView': TableCellActionView;
  }
}
/** tableCell: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleDevuiTablecell extends BeanScopeBase {}

export interface ScopeModuleDevuiTablecell {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'devui-tablecell': ScopeModuleDevuiTablecell;
  }
  
  

  

  
}
  
/** scope: end */
