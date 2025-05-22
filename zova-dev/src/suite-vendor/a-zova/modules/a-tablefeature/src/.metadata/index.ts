import type { BeanScopeUtil } from 'zova';
/** tableFeature: end */
/** scope: begin */
import { BeanScopeBase } from 'zova';
import { Scope } from 'zova-module-a-bean';
/** tableFeature: begin */
import { ITableFeatureOptionsFormat } from '../bean/tableFeature.format.js';
/** tableFeature: end */
/** tableFeature: begin */
import { TableFeatureFormat } from '../bean/tableFeature.format.js';
import { ITableFeatureOptionsRestPage } from '../bean/tableFeature.restPage.js';
import { TableFeatureRestPage } from '../bean/tableFeature.restPage.js';
import { ITableFeatureOptionsSchema } from '../bean/tableFeature.schema.js';
import { TableFeatureSchema } from '../bean/tableFeature.schema.js';
import 'zova';
import 'zova';

import 'zova';

export * from '../bean/tableFeature.format.js';
export * from '../bean/tableFeature.restPage.js';
export * from '../bean/tableFeature.schema.js';
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

  export interface TableFeatureRestPage {
    /** @internal */
    get scope(): ScopeModuleATablefeature;
  }

  export interface TableFeatureSchema {
    /** @internal */
    get scope(): ScopeModuleATablefeature;
  }
}
declare module 'zova' {
  export interface IBeanRecordLocal {
    'a-tablefeature.tableFeature.format': TableFeatureFormat;
    'a-tablefeature.tableFeature.restPage': TableFeatureRestPage;
    'a-tablefeature.tableFeature.schema': TableFeatureSchema;
  }
}

@Scope()
export class ScopeModuleATablefeature extends BeanScopeBase {}

export interface ScopeModuleATablefeature {
  util: BeanScopeUtil;
}

declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-tablefeature': ScopeModuleATablefeature;
  }

}

/** scope: end */
