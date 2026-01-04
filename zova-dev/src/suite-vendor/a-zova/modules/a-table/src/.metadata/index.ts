/* eslint-disable */
/** service: begin */
export * from '../service/tableCellFormat.js';
export * from '../service/tableFeature.js';

import 'zova-module-a-bean';
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

        export interface ServiceTableCellFormat {
          get $beanFullName(): 'a-table.service.tableCellFormat';
          get $onionName(): 'a-table:tableCellFormat';
          
        }

        export interface ServiceTableFeature {
          /** @internal */
          get scope(): ScopeModuleATable;
        }

        export interface ServiceTableFeature {
          get $beanFullName(): 'a-table.service.tableFeature';
          get $onionName(): 'a-table:tableFeature';
          
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
/** controller: begin */
export * from '../component/table/controller.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-a-table' {
  
        export interface ControllerTable {
          /** @internal */
          get scope(): ScopeModuleATable;
        } 
}
/** controller: end */
/** controller: begin */
import { ControllerTable } from '../component/table/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'a-table.controller.table': ControllerTable;
  }
}
/** controller: end */

/** components: begin */
export * from './component/table.js';
import { ZTable } from './component/table.js';
export const components = {
  'table': ZTable,
};
import 'zova';
declare module 'zova' {
export interface IComponentRecord {
  'a-table:table': ControllerTable;
}
export interface IZovaComponentRecord {
  'a-table:table': typeof ZTable;
}
}
/** components: end */
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
