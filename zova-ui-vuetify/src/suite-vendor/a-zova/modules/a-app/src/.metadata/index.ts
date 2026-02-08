/* eslint-disable */
/** controller: begin */
export * from '../component/app/controller.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-a-app' {
  
        export interface ControllerApp {
          /** @internal */
          get scope(): ScopeModuleAApp;
        } 
}
/** controller: end */
/** controller: begin */
import { ControllerApp } from '../component/app/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'a-app.controller.app': ControllerApp;
  }
}
/** controller: end */

/** components: begin */
export * from './component/app.js';
import { ZApp } from './component/app.js';
export const components = {
  'app': ZApp,
};
import 'zova';
declare module 'zova' {
export interface IComponentRecord {
  'a-app:app': ControllerApp;
}
export interface IZovaComponentRecord {
  'a-app:app': typeof ZApp;
}
}
/** components: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleAApp extends BeanScopeBase {}

export interface ScopeModuleAApp {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-app': ScopeModuleAApp;
  }
  
  

  

  
}
  
/** scope: end */
