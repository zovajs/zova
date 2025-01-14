/** controller: begin */
export * from '../component/behavior/controller.jsx';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-a-behavior' {
  export interface ControllerBehavior {
    /** @internal */
    get scope(): ScopeModuleABehavior;
  }
}
/** controller: end */
/** controller: begin */
import { ControllerBehavior } from '../component/behavior/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'a-behavior.controller.behavior': ControllerBehavior;
  }
}
/** controller: end */

/** components: begin */

export { default as ZBehavior } from './component/behavior.vue';
import { default as ZBehavior } from './component/behavior.vue';
export const components = {
  behavior: ZBehavior,
};
import 'zova';
declare module 'zova' {
  export interface IComponentRecord {
    'a-behavior:behavior': ControllerBehavior;
  }
}
declare module 'zova-module-a-behavior' {}
/** components: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleABehavior extends BeanScopeBase {}

export interface ScopeModuleABehavior {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-behavior': ScopeModuleABehavior;
  }
}

/** scope: end */
