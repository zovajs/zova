/* eslint-disable */
/** controller: begin */
export * from '../component/dateRange/controller.jsx';
export * from '../component/formFieldDateRange/controller.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-basic-date' {
  
        export interface ControllerDateRange {
          /** @internal */
          get scope(): ScopeModuleBasicDate;
        }

        export interface ControllerFormFieldDateRange {
          /** @internal */
          get scope(): ScopeModuleBasicDate;
        } 
}
/** controller: end */
/** controller: begin */
import { ControllerDateRange } from '../component/dateRange/controller.jsx';
import { ControllerFormFieldDateRange } from '../component/formFieldDateRange/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'basic-date.controller.dateRange': ControllerDateRange;
'basic-date.controller.formFieldDateRange': ControllerFormFieldDateRange;
  }
}
/** controller: end */

/** components: begin */
export * from './component/dateRange.js';
import { ZDateRange } from './component/dateRange.js';
export * from './component/formFieldDateRange.js';
import { ZFormFieldDateRange } from './component/formFieldDateRange.js';
export const components = {
  'dateRange': ZDateRange,
'formFieldDateRange': ZFormFieldDateRange,
};
import 'zova';
declare module 'zova' {
export interface IComponentRecord {
  'basic-date:dateRange': ControllerDateRange;
'basic-date:formFieldDateRange': ControllerFormFieldDateRange;
}
export interface IZovaComponentRecord {
  'basic-date:dateRange': typeof ZDateRange;
'basic-date:formFieldDateRange': typeof ZFormFieldDateRange;
}
}
/** components: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleBasicDate extends BeanScopeBase {}

export interface ScopeModuleBasicDate {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'basic-date': ScopeModuleBasicDate;
  }
  
  

  

  
}
  
/** scope: end */
