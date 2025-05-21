import type { BeanScopeUtil } from 'zova';
/** service: end */
/** scope: begin */
import { BeanScopeBase } from 'zova';
import { Scope } from 'zova-module-a-bean';
/** service: end */
/** service: begin */
import { ServiceTableCellFormat } from '../service/tableCellFormat.js';
/** service: begin */
import 'zova';
import 'zova';

import 'zova';

export * from '../service/tableCellFormat.js';
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
