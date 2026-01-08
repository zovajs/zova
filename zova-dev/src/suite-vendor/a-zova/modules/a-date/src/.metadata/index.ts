/* eslint-disable */
/** controller: begin */
export * from '../component/dateRange/controller.jsx';
export * from '../component/formFieldDateRange/controller.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-a-date' {
  
        export interface ControllerDateRange {
          /** @internal */
          get scope(): ScopeModuleADate;
        }

        export interface ControllerFormFieldDateRange {
          /** @internal */
          get scope(): ScopeModuleADate;
        } 
}
/** controller: end */
/** controller: begin */
import { ControllerDateRange } from '../component/dateRange/controller.jsx';
import { ControllerFormFieldDateRange } from '../component/formFieldDateRange/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'a-date.controller.dateRange': ControllerDateRange;
'a-date.controller.formFieldDateRange': ControllerFormFieldDateRange;
  }
}
/** controller: end */

/** components: begin */
export * from './component/dateRange.js';
import { ZDateRange } from './component/dateRange.js';
export * from './component/formFieldDateRange.js';
import { ZFormFieldDateRange } from './component/formFieldDateRange.js';
export const components = {
  'dateRange': ZDateRange,
'formFieldDateRange': ZFormFieldDateRange,
};
import 'zova';
declare module 'zova' {
export interface IComponentRecord {
  'a-date:dateRange': ControllerDateRange;
'a-date:formFieldDateRange': ControllerFormFieldDateRange;
}
export interface IZovaComponentRecord {
  'a-date:dateRange': typeof ZDateRange;
'a-date:formFieldDateRange': typeof ZFormFieldDateRange;
}
}
/** components: end */
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
