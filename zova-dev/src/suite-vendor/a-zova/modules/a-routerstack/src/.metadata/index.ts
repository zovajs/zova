/* eslint-disable */
/** model: begin */
export * from '../model/stack.js';
import { IModelOptionsStack } from '../model/stack.js';
import 'zova-module-a-model';
declare module 'zova-module-a-model' {
  
    export interface IModelRecord {
      'a-routerstack:stack': IModelOptionsStack;
    }

  
}
declare module 'zova-module-a-routerstack' {
  
        export interface ModelStack {
          /** @internal */
          get scope(): ScopeModuleARouterstack;
        }

        export interface ModelStack {
          get $beanFullName(): 'a-routerstack.model.stack';
          get $onionName(): 'a-routerstack:stack';
          get $onionOptions(): IModelOptionsStack;
        } 
}
/** model: end */
/** model: begin */
import { ModelStack } from '../model/stack.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-routerstack.model.stack': ModelStack;
  }
}
/** model: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleARouterstack extends BeanScopeBase {}

export interface ScopeModuleARouterstack {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-routerstack': ScopeModuleARouterstack;
  }
  
  

  

  
}
  
/** scope: end */
