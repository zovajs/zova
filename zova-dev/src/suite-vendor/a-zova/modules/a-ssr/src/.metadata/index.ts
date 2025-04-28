/** monkeySys: begin */
import type { BeanScopeUtil } from 'zova';
/** monkeySys: end */
/** scope: begin */
import { BeanScopeBase } from 'zova';
import { Scope } from 'zova-module-a-bean';

import 'zova';

export * from '../monkeySys.js';

@Scope()
export class ScopeModuleASsr extends BeanScopeBase {}

export interface ScopeModuleASsr {
  util: BeanScopeUtil;
}

declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-ssr': ScopeModuleASsr;
  }

}

/** scope: end */
