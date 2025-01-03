/** bean: begin */
export * from '../bean/bean.serviceBase.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-a-api' {}
/** bean: end */
/** bean: begin */
import { BeanServiceBase } from '../bean/bean.serviceBase.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-api.bean.serviceBase': BeanServiceBase;
  }
}
/** bean: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** monkey: begin */
export * from '../monkey.js';
/** monkey: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil, TypeModuleConfig } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleAApi extends BeanScopeBase {}

export interface ScopeModuleAApi {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-api': ScopeModuleAApi;
  }

  export interface IBeanScopeConfig {
    'a-api': ReturnType<typeof config>;
  }
}

/** scope: end */
/** scope module: begin */

declare module 'zova-module-a-api' {}
/** scope module: end */
