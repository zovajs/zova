/* eslint-disable */
/** controller: begin */
export * from '../component/restPageEntry/controller.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-devui-restpageentry' {
  
        export interface ControllerRestPageEntry {
          /** @internal */
          get scope(): ScopeModuleDevuiRestpageentry;
        } 
}
/** controller: end */
/** controller: begin */
import { ControllerRestPageEntry } from '../component/restPageEntry/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'devui-restpageentry.controller.restPageEntry': ControllerRestPageEntry;
  }
}
/** controller: end */

/** components: begin */
export * from './component/restPageEntry.js';
import { ZRestPageEntry } from './component/restPageEntry.js';
export const components = {
  'restPageEntry': ZRestPageEntry,
};
import 'zova';
declare module 'zova' {
export interface IComponentRecord {
  'devui-restpageentry:restPageEntry': ControllerRestPageEntry;
}
export interface IZovaComponentRecord {
  'devui-restpageentry:restPageEntry': typeof ZRestPageEntry;
}
}
/** components: end */
/** render: begin */
export * from '../component/restPageEntry/render.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-devui-restpageentry' {
  
        export interface RenderRestPageEntry {
          /** @internal */
          get scope(): ScopeModuleDevuiRestpageentry;
        } 
}
/** render: end */
/** render: begin */
import { RenderRestPageEntry } from '../component/restPageEntry/render.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'devui-restpageentry.render.restPageEntry': RenderRestPageEntry;
  }
}
/** render: end */
/** locale: begin */
import { locales } from './locales.js';
/** locale: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil, TypeModuleLocales, TypeLocaleBase } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleDevuiRestpageentry extends BeanScopeBase {}

export interface ScopeModuleDevuiRestpageentry {
  util: BeanScopeUtil;
locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'devui-restpageentry': ScopeModuleDevuiRestpageentry;
  }
  
  

  export interface IBeanScopeLocale {
    'devui-restpageentry': (typeof locales)[TypeLocaleBase];
  }

  
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `devui-restpageentry::${K}` {
  return `devui-restpageentry::${key}`;
}  
/** scope: end */
