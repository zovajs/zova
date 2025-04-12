import type { BeanScopeUtil } from 'zova';
/** bean: end */
/** scope: begin */
import { BeanScopeBase } from 'zova';
import { Scope } from 'zova-module-a-bean';

/** bean: end */
/** bean: begin */
import { BeanIcon } from '../bean/bean.icon.js';
/** sys: end */
/** sys: begin */
import { SysIcon } from '../bean/sys.icon.js';
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

@Scope()
export class ScopeModuleAIcon extends BeanScopeBase {}

export interface ScopeModuleAIcon {
  util: BeanScopeUtil;
}

declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-icon': ScopeModuleAIcon;
  }

}

/** scope: end */
