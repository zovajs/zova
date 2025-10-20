/* eslint-disable */
/** service: begin */
export * from '../service/tableCellFormat.js';
export * from '../service/tableFeature.js';

import 'zova';
declare module 'zova-module-a-bean' {
  
    export interface IServiceRecord {
      'a-table:tableCellFormat': never;
'a-table:tableFeature': never;
    }

  
}
declare module 'zova-module-a-table' {
  
        export interface ServiceTableCellFormat {
          /** @internal */
          get scope(): ScopeModuleATable;
        }

        export interface ServiceTableFeature {
          /** @internal */
          get scope(): ScopeModuleATable;
        } 
}
/** service: end */
/** service: begin */
import { ServiceTableCellFormat } from '../service/tableCellFormat.js';
import { ServiceTableFeature } from '../service/tableFeature.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-table.service.tableCellFormat': ServiceTableCellFormat;
'a-table.service.tableFeature': ServiceTableFeature;
  }
}
/** service: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleATable extends BeanScopeBase {}

export interface ScopeModuleATable {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-table': ScopeModuleATable;
  }
  
  

  

  
}
  
/** scope: end */
