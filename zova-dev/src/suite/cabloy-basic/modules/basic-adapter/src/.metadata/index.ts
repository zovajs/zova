/* eslint-disable */
/** monkeySys: begin */
export * from '../monkeySys.js';
/** monkeySys: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleBasicAdapter extends BeanScopeBase {}

export interface ScopeModuleBasicAdapter {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'basic-adapter': ScopeModuleBasicAdapter;
  }
  
  

  

  
}
  
/** scope: end */
