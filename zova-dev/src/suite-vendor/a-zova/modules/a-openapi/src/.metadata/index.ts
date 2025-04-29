import type { BeanScopeUtil } from 'zova';
/** sys: end */
/** scope: begin */
import { BeanScopeBase } from 'zova';
import { Scope } from 'zova-module-a-bean';
/** sys: end */
/** sys: begin */
import { SysSdk } from '../bean/sys.sdk.js';
/** sys: begin */
import 'zova';
import 'zova';

import 'zova';

export * from '../bean/sys.sdk.js';
declare module 'zova' {

}
declare module 'zova-module-a-openapi' {

  export interface SysSdk {
    /** @internal */
    get scope(): ScopeModuleAOpenapi;
  }
}
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-openapi.sys.sdk': SysSdk;
  }
}

@Scope()
export class ScopeModuleAOpenapi extends BeanScopeBase {}

export interface ScopeModuleAOpenapi {
  util: BeanScopeUtil;
}

declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-openapi': ScopeModuleAOpenapi;
  }

}

/** scope: end */
