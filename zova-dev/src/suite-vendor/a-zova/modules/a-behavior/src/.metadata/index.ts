import type { BeanScopeUtil } from 'zova';
/** behaviors: end */
/** scope: begin */
import { BeanScopeBase } from 'zova';
import { Scope } from 'zova-module-a-bean';
/** bean: end */
/** bean: begin */
import { BeanBehavior } from '../bean/bean.behavior.js';

import { BeanBehaviorBase } from '../bean/bean.behaviorBase.js';
/** controller: end */
/** controller: begin */
import { ControllerBehavior } from '../component/behavior/controller.jsx';
/** service: end */
/** service: begin */
import { ServiceComposer } from '../service/composer.js';

import { ZBehavior } from './component/behavior.js';
/** bean: begin */
import 'zova';
import 'zova';
import 'zova';
import 'zova';

import 'zova';
import 'zova';
import 'zova';
import 'zova';
/** behavior: end */
/** behaviors: begin */
import 'vue';
import 'vue/jsx-runtime';

import 'zova';

export * from '../bean/bean.behavior.js';
export * from '../bean/bean.behaviorBase.js';
declare module 'zova' {

}
declare module 'zova-module-a-behavior' {

  export interface BeanBehavior {
    /** @internal */
    get scope(): ScopeModuleABehavior;
  }
}
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-behavior.bean.behavior': BeanBehavior;
    'a-behavior.bean.behaviorBase': BeanBehaviorBase;
  }
}
/** components: end */
/** behavior: begin */
export * from '../bean/behavior.root_.js';
declare module 'zova-module-a-bean' {

  export interface IServiceRecord {
    'a-behavior:composer': never;
  }

}
declare module 'zova-module-a-behavior' {

  export interface ServiceComposer {
    /** @internal */
    get scope(): ScopeModuleABehavior;
  }
}
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-behavior.service.composer': ServiceComposer;
  }
}
/** service: end */
/** controller: begin */
export * from '../component/behavior/controller.jsx';
declare module 'zova' {

}
declare module 'zova-module-a-behavior' {

  export interface ControllerBehavior {
    /** @internal */
    get scope(): ScopeModuleABehavior;
  }
}
declare module 'zova' {
  export interface IBeanRecordLocal {
    'a-behavior.controller.behavior': ControllerBehavior;
  }
}
/** controller: end */

/** bean: end */
/** service: begin */
export * from '../service/composer.js';
export const components = {
  behavior: ZBehavior,
};
declare module 'zova' {
  export interface IComponentRecord {
    'a-behavior:behavior': ControllerBehavior;
  }
}
/** components: begin */
export * from './component/behavior.js';
declare module 'zova-module-a-behavior' {

}
declare module 'zova-module-a-behavior' {

}

declare module 'vue' {
  export interface InputHTMLAttributes {

  }
}

declare module 'vue/jsx-runtime' {
  namespace JSX {
    // need define class/style in IntrinsicAttributes
    export interface IntrinsicAttributes {

    }
  }
}

@Scope()
export class ScopeModuleABehavior extends BeanScopeBase {}

export interface ScopeModuleABehavior {
  util: BeanScopeUtil;
}

declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-behavior': ScopeModuleABehavior;
  }

}

/** scope: end */
