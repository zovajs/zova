import type { BeanScopeUtil } from 'zova';
/** tableCellFormat: end */
/** scope: begin */
import { BeanScopeBase } from 'zova';
import { Scope } from 'zova-module-a-bean';
/** bean: end */
/** bean: begin */
import { BeanTableCellFormatBase } from '../bean/bean.tableCellFormatBase.js';
import { ITableCellFormatOptionsFallback } from '../bean/tableCellFormat.fallback.js';
/** tableCellFormat: end */
/** tableCellFormat: begin */
import { TableCellFormatFallback } from '../bean/tableCellFormat.fallback.js';
/** bean: begin */
import 'zova';
import 'zova';
import 'zova';
import 'zova';

import 'zova';

export * from '../bean/bean.tableCellFormatBase.js';
declare module 'zova' {

}
declare module 'zova-module-a-table' {

}
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-table.bean.tableCellFormatBase': BeanTableCellFormatBase;
  }
}
/** bean: end */
/** tableCellFormat: begin */
export * from '../bean/tableCellFormat.fallback.js';
declare module 'zova-module-a-table' {

  export interface ITableCellFormatRecord {
    'a-table:fallback': ITableCellFormatOptionsFallback;
  }

}
declare module 'zova-module-a-table' {

  export interface TableCellFormatFallback {
    /** @internal */
    get scope(): ScopeModuleATable;
  }
}
declare module 'zova' {
  export interface IBeanRecordLocal {
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
