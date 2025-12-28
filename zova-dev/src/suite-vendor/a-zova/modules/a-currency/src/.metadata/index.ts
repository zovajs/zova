/* eslint-disable */
/** controller: begin */
export * from '../component/formFieldCurrency/controller.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-a-currency' {
  
        export interface ControllerFormFieldCurrency {
          /** @internal */
          get scope(): ScopeModuleACurrency;
        } 
}
/** controller: end */
/** controller: begin */
import { ControllerFormFieldCurrency } from '../component/formFieldCurrency/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'a-currency.controller.formFieldCurrency': ControllerFormFieldCurrency;
  }
}
/** controller: end */

/** components: begin */
export * from './component/formFieldCurrency.js';
import { ZFormFieldCurrency } from './component/formFieldCurrency.js';
export const components = {
  'formFieldCurrency': ZFormFieldCurrency,
};
import 'zova';
declare module 'zova' {
export interface IComponentRecord {
  'a-currency:formFieldCurrency': ControllerFormFieldCurrency;
}
export interface IZovaComponentRecord {
  'a-currency:formFieldCurrency': typeof ZFormFieldCurrency;
}
}
/** components: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleACurrency extends BeanScopeBase {}

export interface ScopeModuleACurrency {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-currency': ScopeModuleACurrency;
  }
  
  

  

  
}
  
/** scope: end */
