/* eslint-disable */
/** monkeySys: begin */
export * from '../monkeySys.js';
/** monkeySys: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleASsrhmr extends BeanScopeBase {}

export interface ScopeModuleASsrhmr {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-ssrhmr': ScopeModuleASsrhmr;
  }
  
  

  

  
}
  
/** scope: end */
