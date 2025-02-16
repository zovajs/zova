/** monkey: end */
/** scope: begin */
import type { BeanScopeUtil, TypeModuleConfig } from 'zova';
/** bean: end */
/** bean: begin */
import type { BeanTheme } from '../bean/bean.theme.js';
import type { config } from '../config/config.js';
import { BeanScopeBase } from 'zova';
import { Scope } from 'zova-module-a-bean';
/** bean: begin */
import 'zova';
import 'zova';

import 'zova';

export * from '../bean/bean.theme.js';
declare module 'zova' {}
declare module 'zova-module-a-style' {
  export interface BeanTheme {
    /** @internal */
    get scope(): ScopeModuleAStyle;
  }
}
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-style.bean.theme': BeanTheme;
  }
}
/** bean: end */
/** config: begin */
export * from '../config/config.js';
/** config: end */
/** monkey: begin */
export * from '../monkey.js';

@Scope()
export class ScopeModuleAStyle extends BeanScopeBase {}

export interface ScopeModuleAStyle {
  util: BeanScopeUtil;
  config: TypeModuleConfig<typeof config>;
}
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-style': ScopeModuleAStyle;
  }

  export interface IBeanScopeConfig {
    'a-style': ReturnType<typeof config>;
  }
}

/** scope: end */
