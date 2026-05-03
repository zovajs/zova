// eslint-disable
/** controller: begin */
export * from '../component/blockPageEntry/controller.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-basic-pageentry' {
  
        export interface ControllerBlockPageEntry {
          /** @internal */
          get scope(): ScopeModuleBasicPageentry;
        } 
}
/** controller: end */
/** controller: begin */
import { ControllerBlockPageEntry } from '../component/blockPageEntry/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'basic-pageentry.controller.blockPageEntry': ControllerBlockPageEntry;
  }
}
/** controller: end */

/** components: begin */
export * from './component/blockPageEntry.js';
import { ZBlockPageEntry } from './component/blockPageEntry.js';
export const components = {
  'blockPageEntry': ZBlockPageEntry,
};
import 'zova';
declare module 'zova' {
export interface IComponentRecord {
  'basic-pageentry:blockPageEntry': ControllerBlockPageEntry;
}
export interface IZovaComponentRecord {
  'basic-pageentry:blockPageEntry': typeof ZBlockPageEntry;
}
}
/** components: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleBasicPageentry extends BeanScopeBase {}

export interface ScopeModuleBasicPageentry {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'basic-pageentry': ScopeModuleBasicPageentry;
  }
  
  

  

  
}
  
/** scope: end */
