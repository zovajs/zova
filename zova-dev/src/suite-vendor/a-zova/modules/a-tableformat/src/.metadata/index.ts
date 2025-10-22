/* eslint-disable */
/** tableCellFormat: begin */
export * from '../bean/tableCellFormat.currency.js';
export * from '../bean/tableCellFormat.fallback.js';
import { ITableCellFormatOptionsCurrency } from '../bean/tableCellFormat.currency.js';
import { ITableCellFormatOptionsFallback } from '../bean/tableCellFormat.fallback.js';
import 'zova-module-a-table';
declare module 'zova-module-a-table' {
  
    export interface ITableCellFormatRecord {
      'a-tableformat:currency': ITableCellFormatOptionsCurrency;
'a-tableformat:fallback': ITableCellFormatOptionsFallback;
    }

  
}
declare module 'zova-module-a-tableformat' {
  
        export interface TableCellFormatCurrency {
          /** @internal */
          get scope(): ScopeModuleATableformat;
        }

        export interface TableCellFormatCurrency {
          get $beanFullName(): 'a-tableformat.tableCellFormat.currency';
          get $onionName(): 'a-tableformat:currency';
        }

        export interface TableCellFormatFallback {
          /** @internal */
          get scope(): ScopeModuleATableformat;
        }

        export interface TableCellFormatFallback {
          get $beanFullName(): 'a-tableformat.tableCellFormat.fallback';
          get $onionName(): 'a-tableformat:fallback';
        } 
}
/** tableCellFormat: end */
/** tableCellFormat: begin */
import { TableCellFormatCurrency } from '../bean/tableCellFormat.currency.js';
import { TableCellFormatFallback } from '../bean/tableCellFormat.fallback.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'a-tableformat.tableCellFormat.currency': TableCellFormatCurrency;
'a-tableformat.tableCellFormat.fallback': TableCellFormatFallback;
  }
}
/** tableCellFormat: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleATableformat extends BeanScopeBase {}

export interface ScopeModuleATableformat {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-tableformat': ScopeModuleATableformat;
  }
  
  

  

  
}
  
/** scope: end */
