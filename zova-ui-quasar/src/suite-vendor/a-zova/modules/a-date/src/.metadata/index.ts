/* eslint-disable */
/** tableCell: begin */
export * from '../bean/tableCell.date.jsx';
import { ITableCellOptionsDate } from '../bean/tableCell.date.jsx';
import 'zova-module-a-table';
declare module 'zova-module-a-table' {
  
    export interface ITableCellRecord {
      'a-date:date': ITableCellOptionsDate;
    }

  
}
declare module 'zova-module-a-date' {
  
        export interface TableCellDate {
          /** @internal */
          get scope(): ScopeModuleADate;
        }

        export interface TableCellDate {
          get $beanFullName(): 'a-date.tableCell.date';
          get $onionName(): 'a-date:date';
          get $onionOptions(): ITableCellOptionsDate;
        } 
}
/** tableCell: end */
/** tableCell: begin */
import { TableCellDate } from '../bean/tableCell.date.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-date.tableCell.date': TableCellDate;
  }
}
/** tableCell: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleADate extends BeanScopeBase {}

export interface ScopeModuleADate {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-date': ScopeModuleADate;
  }
  
  

  

  
}
  
/** scope: end */
