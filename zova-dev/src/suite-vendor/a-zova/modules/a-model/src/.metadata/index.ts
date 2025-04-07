/** monkey: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil, TypeModuleConfig } from 'zova';
import { Scope } from 'zova-module-a-bean';
/** bean: end */
/** bean: begin */
import { BeanModelBase } from '../bean/bean.modelBase.js';

import { config } from '../config/config.js';
/** service: end */
/** service: begin */
import { ServiceStorage } from '../service/storage.js';
/** bean: begin */
import 'zova';
import 'zova';
import 'zova';
import 'zova';

import 'zova';

export * from '../bean/bean.modelBase.js';
declare module 'zova' {

}
declare module 'zova-module-a-model' {

}
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-model.bean.modelBase': BeanModelBase;
  }
}
/** service: end */
/** config: begin */
export * from '../config/config.js';
declare module 'zova-module-a-bean' {

  export interface IServiceRecord {
    'a-model:storage': never;
  }

}
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
