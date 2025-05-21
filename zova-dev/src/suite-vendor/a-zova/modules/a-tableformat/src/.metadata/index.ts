import type { BeanScopeUtil } from 'zova';
/** tableCellFormat: end */
/** scope: begin */
import { BeanScopeBase } from 'zova';
import { Scope } from 'zova-module-a-bean';
/** tableCellFormat: begin */
import { ITableCellFormatOptionsCurrency } from '../bean/tableCellFormat.currency.js';
/** tableCellFormat: end */
/** tableCellFormat: begin */
import { TableCellFormatCurrency } from '../bean/tableCellFormat.currency.js';
import { ITableCellFormatOptionsFallback } from '../bean/tableCellFormat.fallback.js';
import { TableCellFormatFallback } from '../bean/tableCellFormat.fallback.js';
import 'zova';
import 'zova';

import 'zova';

export * from '../bean/tableCellFormat.currency.js';
export * from '../bean/tableCellFormat.fallback.js';
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

  export interface TableCellFormatFallback {
    /** @internal */
    get scope(): ScopeModuleATableformat;
  }
}
declare module 'zova' {
  export interface IBeanRecordLocal {
    'a-tableformat.tableCellFormat.currency': TableCellFormatCurrency;
    'a-tableformat.tableCellFormat.fallback': TableCellFormatFallback;
  }
}

@Scope()
export class ScopeModuleATableformat extends BeanScopeBase {}

export interface ScopeModuleATableformat {
  util: BeanScopeUtil;
}

declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-tableformat': ScopeModuleATableformat;
  }

}

/** scope: end */
