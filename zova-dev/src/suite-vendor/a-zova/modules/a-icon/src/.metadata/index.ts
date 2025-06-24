/* eslint-disable */
/** sys: begin */
export * from '../bean/sys.icon.js';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-a-icon' {
  
        export interface SysIcon {
          /** @internal */
          get scope(): ScopeModuleAIcon;
        } 
}
/** sys: end */
/** sys: begin */
import { SysIcon } from '../bean/sys.icon.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-icon.sys.icon': SysIcon;
  }
}
/** sys: end */
/** bean: begin */
export * from '../bean/bean.icon.js';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-a-icon' {
  
        export interface BeanIcon {
          /** @internal */
          get scope(): ScopeModuleAIcon;
        } 
}
/** bean: end */
/** bean: begin */
import { BeanIcon } from '../bean/bean.icon.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-icon.bean.icon': BeanIcon;
  }
}
/** bean: end */
/** config: begin */
export * from '../config/config.js';
import { config } from '../config/config.js';
/** config: end */
/** monkeySys: begin */
export * from '../monkeySys.js';
/** monkeySys: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil, TypeModuleConfig } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleAIcon extends BeanScopeBase {}

export interface ScopeModuleAIcon {
  util: BeanScopeUtil;
config: TypeModuleConfig<typeof config>;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-icon': ScopeModuleAIcon;
  }
  
  export interface IBeanScopeConfig {
    'a-icon': ReturnType<typeof config>;
  }

  
}
  
/** scope: end */
