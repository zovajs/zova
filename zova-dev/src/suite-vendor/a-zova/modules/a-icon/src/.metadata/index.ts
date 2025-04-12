import type { BeanScopeUtil } from 'zova';
/** config: end */
/** scope: begin */
import { BeanScopeBase, TypeModuleConfig } from 'zova';
import { Scope } from 'zova-module-a-bean';

/** bean: end */
/** bean: begin */
import { BeanIcon } from '../bean/bean.icon.js';
/** sys: end */
/** sys: begin */
import { SysIcon } from '../bean/sys.icon.js';
import { config } from '../config/config.js';
/** sys: end */
/** bean: begin */
import 'zova';
import 'zova';
import 'zova';
import 'zova';

import 'zova';

export * from '../bean/bean.icon.js';
declare module 'zova' {

}
declare module 'zova-module-a-icon' {

  export interface SysIcon {
    /** @internal */
    get scope(): ScopeModuleAIcon;
  }
}
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-icon.sys.icon': SysIcon;
  }
}
/** sys: begin */
export * from '../bean/sys.icon.js';
declare module 'zova' {

}
declare module 'zova-module-a-icon' {

  export interface BeanIcon {
    /** @internal */
    get scope(): ScopeModuleAIcon;
  }
}
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-icon.bean.icon': BeanIcon;
  }
}
/** bean: end */
/** config: begin */
export * from '../config/config.js';

@Scope()
export class ScopeModuleAIcon extends BeanScopeBase {}

export interface ScopeModuleAIcon {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
}

declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-icon': ScopeModuleAIcon;
  }

  export interface IBeanScopeConfig {
    'a-icon': ReturnType<typeof config>;
  }

}

/** scope: end */
