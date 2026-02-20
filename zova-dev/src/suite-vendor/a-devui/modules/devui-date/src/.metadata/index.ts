/* eslint-disable */
/** controller: begin */
export * from '../component/dateRange/controller.jsx';
export * from '../component/formFieldDateRange/controller.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-devui-date' {
  
        export interface ControllerDateRange {
          /** @internal */
          get scope(): ScopeModuleDevuiDate;
        }

        export interface ControllerFormFieldDateRange {
          /** @internal */
          get scope(): ScopeModuleDevuiDate;
        } 
}
/** controller: end */
/** controller: begin */
import { ControllerDateRange } from '../component/dateRange/controller.jsx';
import { ControllerFormFieldDateRange } from '../component/formFieldDateRange/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'devui-date.controller.dateRange': ControllerDateRange;
'devui-date.controller.formFieldDateRange': ControllerFormFieldDateRange;
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
  'devui-date:dateRange': ControllerDateRange;
'devui-date:formFieldDateRange': ControllerFormFieldDateRange;
}
export interface IZovaComponentRecord {
  'devui-date:dateRange': typeof ZDateRange;
'devui-date:formFieldDateRange': typeof ZFormFieldDateRange;
}
}
/** components: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleDevuiDate extends BeanScopeBase {}

export interface ScopeModuleDevuiDate {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'devui-date': ScopeModuleDevuiDate;
  }
  
  

  

  
}
  
/** scope: end */
