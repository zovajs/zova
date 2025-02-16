/** scope: begin */
import type { BeanScopeUtil } from 'zova';
import { BeanScopeBase } from 'zova';
import { Scope } from 'zova-module-a-bean';

import 'zova';

@Scope()
export class ScopeModuleAMeta extends BeanScopeBase {}

export interface ScopeModuleAMeta {
  util: BeanScopeUtil;
}
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-meta': ScopeModuleAMeta;
  }
}

/** scope: end */
