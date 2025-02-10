/** bean: begin */
export * from '../bean/bean.behavior.js';
export * from '../bean/bean.behaviorBase.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-a-behavior' {
  export interface BeanBehavior {
    /** @internal */
    get scope(): ScopeModuleABehavior;
  }
}
/** bean: end */
/** bean: begin */
import { BeanBehavior } from '../bean/bean.behavior.js';
import { BeanBehaviorBase } from '../bean/bean.behaviorBase.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-behavior.bean.behavior': BeanBehavior;
    'a-behavior.bean.behaviorBase': BeanBehaviorBase;
  }
}
/** bean: end */
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

import { RequiredSome } from 'zova';
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
declare module 'zova-module-a-behavior' {
  export interface ControllerBehaviorProps {
    controllerRef?: (ref: ControllerBehavior) => void;
  }

  export interface ControllerBehavior {
    $props: RequiredSome<ControllerBehaviorProps, keyof typeof ControllerBehavior.$propsDefault>;
  }
}
/** components: end */
/** behavior: begin */
export * from '../bean/behavior.root_.js';

import 'zova';
declare module 'zova-module-a-behavior' {}
declare module 'zova-module-a-behavior' {}
/** behavior: end */
/** behaviors: begin */
import 'vue';
import 'vue/jsx-runtime';

declare module 'vue' {
  export interface InputHTMLAttributes {}
}

declare module 'vue/jsx-runtime' {
  namespace JSX {
    // need define class/style in IntrinsicAttributes
    export interface IntrinsicAttributes {}
  }
}
/** behaviors: end */
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
