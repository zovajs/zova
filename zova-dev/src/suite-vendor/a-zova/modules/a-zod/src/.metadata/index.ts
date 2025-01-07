/** main: begin */
export * from '../main.js';
/** main: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleAZod extends BeanScopeBase {}

export interface ScopeModuleAZod {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-zod': ScopeModuleAZod;
  }
}

/** scope: end */
