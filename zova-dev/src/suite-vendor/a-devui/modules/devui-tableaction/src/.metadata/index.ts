/* eslint-disable */
/** tableCell: begin */
export * from '../bean/tableCell.actionView.jsx';
import { ITableCellOptionsActionView } from '../bean/tableCell.actionView.jsx';
import 'zova-module-a-table';
declare module 'zova-module-a-table' {
  
    export interface ITableCellRecord {
      'devui-tableaction:actionView': ITableCellOptionsActionView;
    }

  
}
declare module 'zova-module-devui-tableaction' {
  
        export interface TableCellActionView {
          /** @internal */
          get scope(): ScopeModuleDevuiTableaction;
        }

        export interface TableCellActionView {
          get $beanFullName(): 'devui-tableaction.tableCell.actionView';
          get $onionName(): 'devui-tableaction:actionView';
          get $onionOptions(): ITableCellOptionsActionView;
        } 
}
/** tableCell: end */
/** tableCell: begin */
import { TableCellActionView } from '../bean/tableCell.actionView.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'devui-tableaction.tableCell.actionView': TableCellActionView;
  }
}
/** tableCell: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleDevuiTableaction extends BeanScopeBase {}

export interface ScopeModuleDevuiTableaction {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'devui-tableaction': ScopeModuleDevuiTableaction;
  }
  
  

  

  
}
  
/** scope: end */
