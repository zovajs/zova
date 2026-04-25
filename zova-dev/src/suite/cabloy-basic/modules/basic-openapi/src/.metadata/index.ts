// eslint-disable
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleBasicOpenapi extends BeanScopeBase {}

export interface ScopeModuleBasicOpenapi {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'basic-openapi': ScopeModuleBasicOpenapi;
  }
  
  

  

  
}
  
/** scope: end */
