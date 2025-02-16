/** monkey: end */
/** scope: begin */
import type { BeanScopeUtil, TypeModuleConfig } from 'zova';
/** bean: end */
/** bean: begin */
import type { BeanApiBase } from '../bean/bean.apiBase.js';
import type { config } from '../config/config.js';
import { BeanScopeBase } from 'zova';
import { Scope } from 'zova-module-a-bean';
/** bean: begin */
import 'zova';
import 'zova';

import 'zova';

export * from '../bean/bean.apiBase.js';
declare module 'zova' {}
declare module 'zova-module-a-api' {}
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-api.bean.apiBase': BeanApiBase;
  }
}
/** bean: end */
/** config: begin */
export * from '../config/config.js';
/** config: end */
/** monkey: begin */
export * from '../monkey.js';

@Scope()
export class ScopeModuleAApi extends BeanScopeBase {}

export interface ScopeModuleAApi {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
}
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-api': ScopeModuleAApi;
  }

  export interface IBeanScopeConfig {
    'a-api': ReturnType<typeof config>;
  }
}

/** scope: end */
