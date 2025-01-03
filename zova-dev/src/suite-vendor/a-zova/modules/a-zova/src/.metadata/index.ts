/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleAZova extends BeanScopeBase {}

export interface ScopeModuleAZova {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-zova': ScopeModuleAZova;
  }
}

/** scope: end */
