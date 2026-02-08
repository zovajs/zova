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
/** tableCell: begin */
export * from '../bean/tableCell.currency.jsx';
import { ITableCellOptionsCurrency } from '../bean/tableCell.currency.jsx';
import 'zova-module-a-table';
declare module 'zova-module-a-table' {
  
    export interface ITableCellRecord {
      'a-currency:currency': ITableCellOptionsCurrency;
    }

  
}
declare module 'zova-module-a-currency' {
  
        export interface TableCellCurrency {
          /** @internal */
          get scope(): ScopeModuleACurrency;
        }

        export interface TableCellCurrency {
          get $beanFullName(): 'a-currency.tableCell.currency';
          get $onionName(): 'a-currency:currency';
          get $onionOptions(): ITableCellOptionsCurrency;
        } 
}
/** tableCell: end */
/** tableCell: begin */
import { TableCellCurrency } from '../bean/tableCell.currency.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-currency.tableCell.currency': TableCellCurrency;
  }
}
/** tableCell: end */
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
