/** bean: begin */
export * from '../bean/bean.fetch.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-a-fetch' {
  export interface BeanFetch {
    /** @internal */
    get scope(): ScopeModuleAFetch;
  }
}
/** bean: end */
/** bean: begin */
import { BeanFetch } from '../bean/bean.fetch.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-fetch.bean.fetch': BeanFetch;
  }
}
/** bean: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleAFetch extends BeanScopeBase {}

export interface ScopeModuleAFetch {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-fetch': ScopeModuleAFetch;
  }
}

/** scope: end */
