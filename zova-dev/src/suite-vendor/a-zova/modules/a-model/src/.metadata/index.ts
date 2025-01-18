/** bean: begin */
export * from '../bean/bean.modelBase.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-a-model' {}
/** bean: end */
/** bean: begin */
import { BeanModelBase } from '../bean/bean.modelBase.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-model.bean.modelBase': BeanModelBase;
  }
}
/** bean: end */
/** service: begin */
export * from '../service/storage.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-a-model' {
  export interface ServiceStorage {
    /** @internal */
    get scope(): ScopeModuleAModel;
  }
}
/** service: end */
/** service: begin */
import { ServiceStorage } from '../service/storage.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-model.service.storage': ServiceStorage;
  }
}
/** service: end */
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
export class ScopeModuleAModel extends BeanScopeBase {}

export interface ScopeModuleAModel {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-model': ScopeModuleAModel;
  }

  export interface IBeanScopeConfig {
    'a-model': ReturnType<typeof config>;
  }
}

/** scope: end */
