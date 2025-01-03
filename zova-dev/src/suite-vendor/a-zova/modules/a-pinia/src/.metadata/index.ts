/** bean: begin */
export * from '../bean/bean.piniaStoreBase.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-a-pinia' {}
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
/** local: begin */
export * from '../bean/local.pinia.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-a-pinia' {
  export interface LocalPinia {
    /** @internal */
    get scope(): ScopeModuleAPinia;
  }
}
/** local: end */
/** local: begin */
import { LocalPinia } from '../bean/local.pinia.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'a-pinia.local.pinia': LocalPinia;
  }
}
/** local: end */
/** monkey: begin */
export * from '../monkey.js';
/** monkey: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'zova';
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
