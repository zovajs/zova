/* eslint-disable */
/** tableFeature: begin */
export * from '../bean/tableFeature.format.js';
export * from '../bean/tableFeature.restPage.js';
export * from '../bean/tableFeature.schema.js';
import { ITableFeatureOptionsFormat } from '../bean/tableFeature.format.js';
import { ITableFeatureOptionsRestPage } from '../bean/tableFeature.restPage.js';
import { ITableFeatureOptionsSchema } from '../bean/tableFeature.schema.js';
import 'zova';
declare module 'zova-module-a-table' {
  
    export interface ITableFeatureRecord {
      'a-tablefeature:format': ITableFeatureOptionsFormat;
'a-tablefeature:restPage': ITableFeatureOptionsRestPage;
'a-tablefeature:schema': ITableFeatureOptionsSchema;
    }

  
}
declare module 'zova-module-a-tablefeature' {
  
        export interface TableFeatureFormat {
          /** @internal */
          get scope(): ScopeModuleATablefeature;
        }

        export interface TableFeatureFormat {
          get $beanFullName(): 'a-tablefeature.tableFeature.format';
          get $onionName(): 'a-tablefeature:format';
        }

        export interface TableFeatureRestPage {
          /** @internal */
          get scope(): ScopeModuleATablefeature;
        }

        export interface TableFeatureRestPage {
          get $beanFullName(): 'a-tablefeature.tableFeature.restPage';
          get $onionName(): 'a-tablefeature:restPage';
        }

        export interface TableFeatureSchema {
          /** @internal */
          get scope(): ScopeModuleATablefeature;
        }

        export interface TableFeatureSchema {
          get $beanFullName(): 'a-tablefeature.tableFeature.schema';
          get $onionName(): 'a-tablefeature:schema';
        } 
}
/** tableFeature: end */
/** tableFeature: begin */
import { TableFeatureFormat } from '../bean/tableFeature.format.js';
import { TableFeatureRestPage } from '../bean/tableFeature.restPage.js';
import { TableFeatureSchema } from '../bean/tableFeature.schema.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'a-tablefeature.tableFeature.format': TableFeatureFormat;
'a-tablefeature.tableFeature.restPage': TableFeatureRestPage;
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
