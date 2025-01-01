/** beans: begin */
export * from '../bean/bean.modelBase.js';
import { BeanModelBase } from '../bean/bean.modelBase.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecord {
    'a-model.bean.modelBase': BeanModelBase;
  }
}
/** beans: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** monkey: begin */
export * from '../monkey.js';
/** monkey: end */
/** scope: begin */
import { BeanScopeBase, Scope, TypeModuleResource } from 'zova';

@Scope()
export class ScopeModuleAModel extends BeanScopeBase {}

export interface ScopeModuleAModel extends TypeModuleResource<typeof config, never, never, never, never> {}

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
/** scope module: begin */
export * from '../bean/local.storage.js';
declare module 'zova-module-a-model' {
  export interface LocalStorage {
    /** @internal */
    get scope(): ScopeModuleAModel;
  }
}
/** scope module: end */
