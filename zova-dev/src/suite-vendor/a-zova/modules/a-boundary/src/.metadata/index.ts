import type { BeanScopeUtil } from 'zova';
/** scope: begin */
import { BeanScopeBase } from 'zova';
import { Scope } from 'zova-module-a-bean';

import 'zova';

@Scope()
export class ScopeModuleABoundary extends BeanScopeBase {}

export interface ScopeModuleABoundary {
  util: BeanScopeUtil;
}

declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-boundary': ScopeModuleABoundary;
  }

}

/** scope: end */
