/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

import 'zova';

@Scope()
export class ScopeModuleAZova extends BeanScopeBase {}

export interface ScopeModuleAZova {
  util: BeanScopeUtil;
}

declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-zova': ScopeModuleAZova;
  }

}

/** scope: end */
