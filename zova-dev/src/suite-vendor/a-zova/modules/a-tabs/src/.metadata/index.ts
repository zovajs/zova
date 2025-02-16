import type { RequiredSome } from 'zova';
/** components: end */
/** scope: begin */
import type { BeanScopeUtil } from 'zova';
/** controller: end */
/** controller: begin */
import type { ControllerRouterViewTabs } from '../component/routerViewTabs/controller.jsx';

/** components: begin */
import type {
  ControllerRouterViewTabsEmits,
  ControllerRouterViewTabsSlots,
} from '../component/routerViewTabs/controller.jsx';
/** model: end */
/** model: begin */
import type { ModelTabs } from '../model/tabs.js';
import { BeanScopeBase } from 'zova';
/** controller: end */

import { Scope } from 'zova-module-a-bean';
import { default as ZRouterViewTabs } from './component/routerViewTabs.vue';
/** model: end */
/** controller: begin */
import 'zova';
import 'zova';
import 'zova';
import 'zova';
import 'zova';

import 'zova';

export * from '../component/routerViewTabs/controller.jsx';
declare module 'zova' {}
declare module 'zova-module-a-tabs' {
  export interface ModelTabs {
    /** @internal */
    get scope(): ScopeModuleATabs;
  }
}
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'a-tabs.model.tabs': ModelTabs;
  }
}
/** model: begin */
export * from '../model/tabs.js';
declare module 'zova' {}
declare module 'zova-module-a-tabs' {
  export interface ControllerRouterViewTabs {
    /** @internal */
    get scope(): ScopeModuleATabs;
  }
}
declare module 'zova' {
  export interface IBeanRecordLocal {
    'a-tabs.controller.routerViewTabs': ControllerRouterViewTabs;
  }
}
export { default as ZRouterViewTabs } from './component/routerViewTabs.vue';
export const components = {
  routerViewTabs: ZRouterViewTabs,
};
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

@Scope()
export class ScopeModuleATabs extends BeanScopeBase {}

export interface ScopeModuleATabs {
  util: BeanScopeUtil;
}

declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-tabs': ScopeModuleATabs;
  }
}

/** scope: end */
