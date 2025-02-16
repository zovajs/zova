/** monkey: end */
/** scope: begin */
import type { BeanScopeUtil, TypeModuleConfig } from 'zova';
/** bean: end */
/** bean: begin */
import type { BeanModelBase } from '../bean/bean.modelBase.js';
import type { config } from '../config/config.js';
/** service: end */
/** service: begin */
import type { ServiceStorage } from '../service/storage.js';

import { BeanScopeBase } from 'zova';
import { Scope } from 'zova-module-a-bean';
/** bean: begin */
import 'zova';
import 'zova';
import 'zova';
import 'zova';

import 'zova';

export * from '../bean/bean.modelBase.js';
declare module 'zova' {}
declare module 'zova-module-a-model' {}
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-model.bean.modelBase': BeanModelBase;
  }
}
/** service: end */
/** config: begin */
export * from '../config/config.js';
declare module 'zova' {}
declare module 'zova-module-a-model' {
  export interface ServiceStorage {
    /** @internal */
    get scope(): ScopeModuleAModel;
  }
}
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-model.service.storage': ServiceStorage;
  }
}
/** config: end */
/** monkey: begin */
export * from '../monkey.js';
/** bean: end */
/** service: begin */
export * from '../service/storage.js';

@Scope()
export class ScopeModuleAModel extends BeanScopeBase {}

export interface ScopeModuleAModel {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
}
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-model': ScopeModuleAModel;
  }

  export interface IBeanScopeConfig {
    'a-model': ReturnType<typeof config>;
  }
}

/** scope: end */
