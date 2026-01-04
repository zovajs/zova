/* eslint-disable */
/** service: begin */
export * from '../service/tableFeature.js';

import 'zova-module-a-bean';
declare module 'zova-module-a-bean' {
  
    export interface IServiceRecord {
      'a-table:tableFeature': never;
    }

  
}
declare module 'zova-module-a-table' {
  
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
import { ServiceTableFeature } from '../service/tableFeature.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
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
/** render: begin */
export * from '../component/table/render.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-a-table' {
  
        export interface RenderTable {
          /** @internal */
          get scope(): ScopeModuleATable;
        } 
}
/** render: end */
/** render: begin */
import { RenderTable } from '../component/table/render.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'a-table.render.table': RenderTable;
  }
}
/** render: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil, TypeModuleConfig } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleATable extends BeanScopeBase {}

export interface ScopeModuleATable {
  util: BeanScopeUtil;
config: TypeModuleConfig<typeof config>;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-table': ScopeModuleATable;
  }
  
  export interface IBeanScopeConfig {
    'a-table': ReturnType<typeof config>;
  }

  

  
}
  
/** scope: end */
