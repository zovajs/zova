import type { BeanScopeUtil } from 'zova';
/** tableCellFormat: end */
/** scope: begin */
import { BeanScopeBase } from 'zova';
import { Scope } from 'zova-module-a-bean';
import { ITableCellFormatOptionsCurrency } from '../bean/tableCellFormat.currency.js';
/** tableCellFormat: end */
/** tableCellFormat: begin */
import { TableCellFormatCurrency } from '../bean/tableCellFormat.currency.js';
import { ITableCellFormatOptionsFallback } from '../bean/tableCellFormat.fallback.js';
import { TableCellFormatFallback } from '../bean/tableCellFormat.fallback.js';
/** service: end */
/** service: begin */
import { ServiceTableCellFormat } from '../service/tableCellFormat.js';
/** service: end */
/** tableCellFormat: begin */
import 'zova';
import 'zova';
import 'zova';
import 'zova';

import 'zova';

export * from '../bean/tableCellFormat.currency.js';
declare module 'zova-module-a-bean' {

  export interface IServiceRecord {
    'a-table:tableCellFormat': never;
  }

}
declare module 'zova-module-a-table' {

  export interface ServiceTableCellFormat {
    /** @internal */
    get scope(): ScopeModuleATable;
  }
}
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-table.service.tableCellFormat': ServiceTableCellFormat;
  }
}
export * from '../bean/tableCellFormat.fallback.js';
/** service: begin */
export * from '../service/tableCellFormat.js';
declare module 'zova-module-a-table' {

  export interface ITableCellFormatRecord {
    'a-table:currency': ITableCellFormatOptionsCurrency;
    'a-table:fallback': ITableCellFormatOptionsFallback;
  }

}
declare module 'zova-module-a-table' {

  export interface TableCellFormatCurrency {
    /** @internal */
    get scope(): ScopeModuleATable;
  }

  export interface TableCellFormatFallback {
    /** @internal */
    get scope(): ScopeModuleATable;
  }
}
declare module 'zova' {
  export interface IBeanRecordLocal {
    'a-table.tableCellFormat.currency': TableCellFormatCurrency;
    'a-table.tableCellFormat.fallback': TableCellFormatFallback;
  }
}

@Scope()
export class ScopeModuleATable extends BeanScopeBase {}

export interface ScopeModuleATable {
  util: BeanScopeUtil;
}

declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-table': ScopeModuleATable;
  }

}

/** scope: end */
