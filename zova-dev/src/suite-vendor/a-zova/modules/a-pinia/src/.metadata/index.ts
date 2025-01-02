/** beans: begin */
export * from '../bean/bean.piniaStoreBase.js';
import { BeanPiniaStoreBase } from '../bean/bean.piniaStoreBase.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'a-pinia.bean.piniaStoreBase': BeanPiniaStoreBase;
  }
}
/** beans: end */
/** monkey: begin */
export * from '../monkey.js';
/** monkey: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'zova';
import { Scope } from 'zova';

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
/** scope module: begin */
export * from '../bean/local.pinia.js';
declare module 'zova-module-a-pinia' {
  export interface LocalPinia {
    /** @internal */
    get scope(): ScopeModuleAPinia;
  }
}
/** scope module: end */
