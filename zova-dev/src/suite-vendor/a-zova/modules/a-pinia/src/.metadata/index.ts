/** monkey: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';
/** bean: end */
/** bean: begin */
import { BeanPiniaStoreBase } from '../bean/bean.piniaStoreBase.js';

/** service: end */
/** service: begin */
import { ServicePinia } from '../service/pinia.js';
/** bean: begin */
import 'zova';
import 'zova';
import 'zova';
import 'zova';

import 'zova';

export * from '../bean/bean.piniaStoreBase.js';
declare module 'zova' {}
declare module 'zova-module-a-pinia' {}
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-pinia.bean.piniaStoreBase': BeanPiniaStoreBase;
  }
}
/** service: end */
/** monkey: begin */
export * from '../monkey.js';
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
}
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-pinia.service.pinia': ServicePinia;
  }
}
/** bean: end */
/** service: begin */
export * from '../service/pinia.js';

@Scope()
export class ScopeModuleAPinia extends BeanScopeBase {}

export interface ScopeModuleAPinia {
  util: BeanScopeUtil;
}
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-pinia': ScopeModuleAPinia;
  }
}

/** scope: end */
