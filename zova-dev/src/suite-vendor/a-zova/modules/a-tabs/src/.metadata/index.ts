/* eslint-disable */
/** controller: begin */
export * from '../component/routerViewTabs/controller.jsx';

import 'zova';
declare module 'zova' {
  
  
}
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

/** components: begin */
export * from './component/routerViewTabs.js';
import { ZRouterViewTabs } from './component/routerViewTabs.js';
export const components = {
  'routerViewTabs': ZRouterViewTabs,
};
import 'zova';
declare module 'zova' {
export interface IComponentRecord {
  'a-tabs:routerViewTabs': ControllerRouterViewTabs;
}
export interface IZovaComponentRecord {
  'a-tabs:routerViewTabs': typeof ZRouterViewTabs;
}
}
/** components: end */
/** model: begin */
export * from '../model/tabs.js';

import 'zova';
declare module 'zova' {
  
  
}
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
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
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
