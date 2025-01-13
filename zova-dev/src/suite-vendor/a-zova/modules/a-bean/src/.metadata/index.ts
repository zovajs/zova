/** bean: begin */
export * from '../bean/bean.onion.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-a-bean' {
  export interface BeanOnion {
    /** @internal */
    get scope(): ScopeModuleABean;
  }
}
/** bean: end */
/** bean: begin */
import { BeanOnion } from '../bean/bean.onion.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-bean.bean.onion': BeanOnion;
  }
}
/** bean: end */
/** service: begin */
export * from '../bean/service.aop.js';
export * from '../bean/service.onion_.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-a-bean' {
  export interface ServiceAop {
    /** @internal */
    get scope(): ScopeModuleABean;
  }
}
/** service: end */
/** service: begin */
import { ServiceAop } from '../bean/service.aop.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-bean.service.aop': ServiceAop;
  }
}
/** service: end */
/** controller: begin */
export * from '../component/behavior/controller.jsx';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-a-bean' {
  export interface ControllerBehavior {
    /** @internal */
    get scope(): ScopeModuleABean;
  }
}
/** controller: end */
/** controller: begin */
import { ControllerBehavior } from '../component/behavior/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'a-bean.controller.behavior': ControllerBehavior;
  }
}
/** controller: end */

/** components: begin */
import { ControllerBehaviorSlots } from '../component/behavior/controller.jsx';
export { default as ZBehavior } from './component/behavior.vue';
import { default as ZBehavior } from './component/behavior.vue';
export const components = {
  behavior: ZBehavior,
};
import 'zova';
declare module 'zova' {
  export interface IComponentRecord {
    'a-bean:behavior': ControllerBehavior;
  }
}
declare module 'zova-module-a-bean' {
  export interface ControllerBehavior {
    $slots: ControllerBehaviorSlots;
  }
}
/** components: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'zova';
import { Scope } from '../lib/scope.js';

@Scope()
export class ScopeModuleABean extends BeanScopeBase {}

export interface ScopeModuleABean {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-bean': ScopeModuleABean;
  }
}

/** scope: end */
