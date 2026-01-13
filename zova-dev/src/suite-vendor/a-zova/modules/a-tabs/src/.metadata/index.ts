/* eslint-disable */
/** controller: begin */
export * from '../component/routerViewLocation/controller.jsx';
export * from '../component/routerViewTabs/controller.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-a-tabs' {
  
        export interface ControllerRouterViewLocation {
          /** @internal */
          get scope(): ScopeModuleATabs;
        }

        export interface ControllerRouterViewTabs {
          /** @internal */
          get scope(): ScopeModuleATabs;
        } 
}
/** controller: end */
/** controller: begin */
import { ControllerRouterViewLocation } from '../component/routerViewLocation/controller.jsx';
import { ControllerRouterViewTabs } from '../component/routerViewTabs/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'a-tabs.controller.routerViewLocation': ControllerRouterViewLocation;
'a-tabs.controller.routerViewTabs': ControllerRouterViewTabs;
  }
}
/** controller: end */

/** components: begin */
export * from './component/routerViewLocation.js';
import { ZRouterViewLocation } from './component/routerViewLocation.js';
export * from './component/routerViewTabs.js';
import { ZRouterViewTabs } from './component/routerViewTabs.js';
export const components = {
  'routerViewLocation': ZRouterViewLocation,
'routerViewTabs': ZRouterViewTabs,
};
import 'zova';
declare module 'zova' {
export interface IComponentRecord {
  'a-tabs:routerViewLocation': ControllerRouterViewLocation;
'a-tabs:routerViewTabs': ControllerRouterViewTabs;
}
export interface IZovaComponentRecord {
  'a-tabs:routerViewLocation': typeof ZRouterViewLocation;
'a-tabs:routerViewTabs': typeof ZRouterViewTabs;
}
}
/** components: end */
/** model: begin */
export * from '../model/tabs.js';
import { IModelOptionsTabs } from '../model/tabs.js';
import 'zova-module-a-model';
declare module 'zova-module-a-model' {
  
    export interface IModelRecord {
      'a-tabs:tabs': IModelOptionsTabs;
    }

  
}
declare module 'zova-module-a-tabs' {
  
        export interface ModelTabs {
          /** @internal */
          get scope(): ScopeModuleATabs;
        }

        export interface ModelTabs {
          get $beanFullName(): 'a-tabs.model.tabs';
          get $onionName(): 'a-tabs:tabs';
          get $onionOptions(): IModelOptionsTabs;
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
