/* eslint-disable */
/** tableFeature: begin */
export * from '../bean/tableFeature.actions.js';
export * from '../bean/tableFeature.format.js';
export * from '../bean/tableFeature.schema.js';
import { ITableFeatureOptionsActions } from '../bean/tableFeature.actions.js';
import { ITableFeatureOptionsFormat } from '../bean/tableFeature.format.js';
import { ITableFeatureOptionsSchema } from '../bean/tableFeature.schema.js';
import 'zova-module-a-table';
declare module 'zova-module-a-table' {
  
    export interface ITableFeatureRecord {
      'a-tablefeature:actions': ITableFeatureOptionsActions;
'a-tablefeature:format': ITableFeatureOptionsFormat;
'a-tablefeature:schema': ITableFeatureOptionsSchema;
    }

  
}
declare module 'zova-module-a-tablefeature' {
  
        export interface TableFeatureActions {
          /** @internal */
          get scope(): ScopeModuleATablefeature;
        }

        export interface TableFeatureActions {
          get $beanFullName(): 'a-tablefeature.tableFeature.actions';
          get $onionName(): 'a-tablefeature:actions';
          get $onionOptions(): ITableFeatureOptionsActions;
        }

        export interface TableFeatureFormat {
          /** @internal */
          get scope(): ScopeModuleATablefeature;
        }

        export interface TableFeatureFormat {
          get $beanFullName(): 'a-tablefeature.tableFeature.format';
          get $onionName(): 'a-tablefeature:format';
          get $onionOptions(): ITableFeatureOptionsFormat;
        }

        export interface TableFeatureSchema {
          /** @internal */
          get scope(): ScopeModuleATablefeature;
        }

        export interface TableFeatureSchema {
          get $beanFullName(): 'a-tablefeature.tableFeature.schema';
          get $onionName(): 'a-tablefeature:schema';
          get $onionOptions(): ITableFeatureOptionsSchema;
        } 
}
/** tableFeature: end */
/** tableFeature: begin */
import { TableFeatureActions } from '../bean/tableFeature.actions.js';
import { TableFeatureFormat } from '../bean/tableFeature.format.js';
import { TableFeatureSchema } from '../bean/tableFeature.schema.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'a-tablefeature.tableFeature.actions': TableFeatureActions;
'a-tablefeature.tableFeature.format': TableFeatureFormat;
'a-tablefeature.tableFeature.schema': TableFeatureSchema;
  }
}
/** tableFeature: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleATablefeature extends BeanScopeBase {}

export interface ScopeModuleATablefeature {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-tablefeature': ScopeModuleATablefeature;
  }
  
  

  

  
}
  
/** scope: end */
