import type { BeanScopeUtil } from 'zova';
/** model: end */
/** scope: begin */
import { BeanScopeBase } from 'zova';
import { Scope } from 'zova-module-a-bean';
/** controller: end */
/** controller: begin */
import { ControllerRouterViewTabs } from '../component/routerViewTabs/controller.jsx';
/** model: end */
/** model: begin */
import { ModelTabs } from '../model/tabs.js';

import { ZRouterViewTabs } from './component/routerViewTabs.js';
/** controller: begin */
import 'zova';
import 'zova';
import 'zova';
import 'zova';
import 'zova';

import 'zova';

export * from '../component/routerViewTabs/controller.jsx';
declare module 'zova' {

}
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
/** controller: end */

/** components: end */
/** model: begin */
export * from '../model/tabs.js';
export const components = {
  routerViewTabs: ZRouterViewTabs,
};
declare module 'zova' {
  export interface IComponentRecord {
    'a-tabs:routerViewTabs': ControllerRouterViewTabs;
  }
  export interface IZovaComponentRecord {
    'a-tabs:routerViewTabs': typeof ZRouterViewTabs;
  }
}
/** components: begin */
export * from './component/routerViewTabs.js';
declare module 'zova' {

}
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
