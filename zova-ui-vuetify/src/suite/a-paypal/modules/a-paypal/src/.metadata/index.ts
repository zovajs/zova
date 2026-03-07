/* eslint-disable */
/** controller: begin */
export * from '../page/paypalCancel/controller.jsx';
export * from '../page/paypalReturn/controller.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-a-paypal' {
  
        export interface ControllerPagePaypalCancel {
          /** @internal */
          get scope(): ScopeModuleAPaypal;
        }

        export interface ControllerPagePaypalReturn {
          /** @internal */
          get scope(): ScopeModuleAPaypal;
        } 
}
/** controller: end */
/** controller: begin */
import { ControllerPagePaypalCancel } from '../page/paypalCancel/controller.jsx';
import { ControllerPagePaypalReturn } from '../page/paypalReturn/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'a-paypal.controller.pagePaypalCancel': ControllerPagePaypalCancel;
'a-paypal.controller.pagePaypalReturn': ControllerPagePaypalReturn;
  }
}
/** controller: end */
/** pages: begin */
export * from './page/paypalCancel.js';
export * from './page/paypalReturn.js';
export * from '../routes.js';
import { TypePagePathSchema } from 'zova-module-a-router';
import 'zova';
declare module 'zova-module-a-router' {
export interface IPagePathRecord {
  '/a/paypal/paypalCancel': TypePagePathSchema<undefined,undefined>;
'/a/paypal/paypalReturn': TypePagePathSchema<undefined,undefined>;
}
export interface IPageNameRecord {
  
}
}
export const pagePathSchemas = {

};
export const pageNameSchemas = {

};
declare module 'zova-module-a-paypal' {
  
}
/** pages: end */

/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleAPaypal extends BeanScopeBase {}

export interface ScopeModuleAPaypal {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-paypal': ScopeModuleAPaypal;
  }
  
  

  

  
}
  
/** scope: end */
