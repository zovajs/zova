/* eslint-disable */
/** bean: begin */
export * from '../bean/bean.piniaStoreBase.js';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-a-pinia' {
   
}
/** bean: end */
/** bean: begin */
import { BeanPiniaStoreBase } from '../bean/bean.piniaStoreBase.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-pinia.bean.piniaStoreBase': BeanPiniaStoreBase;
  }
}
/** bean: end */
/** service: begin */
export * from '../service/pinia.js';

import 'zova-module-a-bean';
declare module 'zova-module-a-bean' {
  
    export interface IServiceRecord {
      'a-pinia:pinia': never;
    }

  
}
declare module 'zova-module-a-pinia' {
  
        export interface ServicePinia {
          /** @internal */
          get scope(): ScopeModuleAPinia;
        }

        export interface ServicePinia {
          get $beanFullName(): 'a-pinia.service.pinia';
          get $onionName(): 'a-pinia:pinia';
        } 
}
/** service: end */
/** service: begin */
import { ServicePinia } from '../service/pinia.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-pinia.service.pinia': ServicePinia;
  }
}
/** service: end */
/** monkey: begin */
export * from '../monkey.js';
/** monkey: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleAPinia extends BeanScopeBase {}

export interface ScopeModuleAPinia {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-pinia': ScopeModuleAPinia;
  }
  
  

  

  
}
  
/** scope: end */
