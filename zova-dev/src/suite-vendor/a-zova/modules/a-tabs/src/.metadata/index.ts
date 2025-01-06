/** model: begin */
export * from '../model/tabs.js';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-a-tabs' {
  export interface ModelTabs {
    /** @internal */
    get scope(): ScopeModuleATabs;
  }
}
/** model: end */
/** model: begin */
import { ModelTabs } from '../model/tabs.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-tabs.model.tabs': ModelTabs;
  }
}
/** model: end */
/** controller: begin */
export * from '../component/routerViewTabs/controller.jsx';

import 'zova';
declare module 'zova' {}
declare module 'zova-module-a-tabs' {
  export interface ControllerRouterViewTabs {
    /** @internal */
    get scope(): ScopeModuleATabs;
  }
}
/** controller: end */
/** controller: begin */
import { ControllerRouterViewTabs } from '../component/routerViewTabs/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'a-tabs.controller.routerViewTabs': ControllerRouterViewTabs;
  }
}
/** controller: end */

import { RequiredSome } from 'zova';
/** components: begin */
import {
  ControllerRouterViewTabsEmits,
  ControllerRouterViewTabsSlots,
} from '../component/routerViewTabs/controller.jsx';
export { default as ZRouterViewTabs } from './component/routerViewTabs.vue';
import { default as ZRouterViewTabs } from './component/routerViewTabs.vue';
export const components = {
  routerViewTabs: ZRouterViewTabs,
};
import 'zova';
declare module 'zova' {
  export interface IComponentRecord {
    'a-tabs:routerViewTabs': ControllerRouterViewTabs;
  }
}
declare module 'zova-module-a-tabs' {
  export interface ControllerRouterViewTabsProps {
    controllerRef?: (ref: ControllerRouterViewTabs) => void;
    slots?: ControllerRouterViewTabsSlots;
  }

  export interface ControllerRouterViewTabs {
    $props: RequiredSome<ControllerRouterViewTabsProps, keyof typeof ControllerRouterViewTabs.$propsDefault>;
    $emit: ControllerRouterViewTabsEmits;
    $slots: ControllerRouterViewTabsSlots;
  }
}
/** components: end */
/** scope: begin */
import { BeanScopeBase, BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleATabs extends BeanScopeBase {}

export interface ScopeModuleATabs {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-tabs': ScopeModuleATabs;
  }
}

/** scope: end */
