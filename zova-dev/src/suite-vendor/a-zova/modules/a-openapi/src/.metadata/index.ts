import type { BeanScopeUtil } from 'zova';
/** config: end */
/** scope: begin */
import { BeanScopeBase, TypeModuleConfig } from 'zova';
import { Scope } from 'zova-module-a-bean';

/** sys: end */
/** sys: begin */
import { SysSdk } from '../bean/sys.sdk.js';
import { config } from '../config/config.js';
/** model: end */
/** model: begin */
import { ModelSdk } from '../model/sdk.js';
/** sys: begin */
import 'zova';
import 'zova';
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
/** model: end */
/** config: begin */
export * from '../config/config.js';
declare module 'zova' {

}
declare module 'zova-module-a-openapi' {

  export interface ModelSdk {
    /** @internal */
    get scope(): ScopeModuleAOpenapi;
  }
}
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-openapi.model.sdk': ModelSdk;
  }
}
/** sys: end */
/** model: begin */
export * from '../model/sdk.js';

@Scope()
export class ScopeModuleAOpenapi extends BeanScopeBase {}

export interface ScopeModuleAOpenapi {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
}

declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-openapi': ScopeModuleAOpenapi;
  }

  export interface IBeanScopeConfig {
    'a-openapi': ReturnType<typeof config>;
  }

}

/** scope: end */
