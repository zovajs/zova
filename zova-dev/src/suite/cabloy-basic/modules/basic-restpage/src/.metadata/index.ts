// eslint-disable
/** controller: begin */
export * from '../component/restPage/controller.jsx';
export * from '../component/restPageEntry/controller.jsx';
export * from '../component/wrapperFilter/controller.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-basic-restpage' {
  
        export interface ControllerRestPage {
          /** @internal */
          get scope(): ScopeModuleBasicRestpage;
        }

        export interface ControllerRestPageEntry {
          /** @internal */
          get scope(): ScopeModuleBasicRestpage;
        }

        export interface ControllerWrapperFilter {
          /** @internal */
          get scope(): ScopeModuleBasicRestpage;
        } 
}
/** controller: end */
/** controller: begin */
import { ControllerRestPage } from '../component/restPage/controller.jsx';
import { ControllerRestPageEntry } from '../component/restPageEntry/controller.jsx';
import { ControllerWrapperFilter } from '../component/wrapperFilter/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'basic-restpage.controller.restPage': ControllerRestPage;
'basic-restpage.controller.restPageEntry': ControllerRestPageEntry;
'basic-restpage.controller.wrapperFilter': ControllerWrapperFilter;
  }
}
/** controller: end */

/** components: begin */
export * from './component/restPage.js';
import { ZRestPage } from './component/restPage.js';
export * from './component/restPageEntry.js';
import { ZRestPageEntry } from './component/restPageEntry.js';
export * from './component/wrapperFilter.js';
import { ZWrapperFilter } from './component/wrapperFilter.js';
export const components = {
  'restPage': ZRestPage,
'restPageEntry': ZRestPageEntry,
'wrapperFilter': ZWrapperFilter,
};
import 'zova';
declare module 'zova' {
export interface IComponentRecord {
  'basic-restpage:restPage': ControllerRestPage;
'basic-restpage:restPageEntry': ControllerRestPageEntry;
'basic-restpage:wrapperFilter': ControllerWrapperFilter;
}
export interface IZovaComponentRecord {
  'basic-restpage:restPage': typeof ZRestPage;
'basic-restpage:restPageEntry': typeof ZRestPageEntry;
'basic-restpage:wrapperFilter': typeof ZWrapperFilter;
}
}
/** components: end */
/** render: begin */
export * from '../component/restPage/render.jsx';
export * from '../component/restPageEntry/render.jsx';
export * from '../component/wrapperFilter/render.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-basic-restpage' {
  
        export interface RenderRestPage {
          /** @internal */
          get scope(): ScopeModuleBasicRestpage;
        }

        export interface RenderRestPageEntry {
          /** @internal */
          get scope(): ScopeModuleBasicRestpage;
        }

        export interface RenderWrapperFilter {
          /** @internal */
          get scope(): ScopeModuleBasicRestpage;
        } 
}
/** render: end */
/** render: begin */
import { RenderRestPage } from '../component/restPage/render.jsx';
import { RenderRestPageEntry } from '../component/restPageEntry/render.jsx';
import { RenderWrapperFilter } from '../component/wrapperFilter/render.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'basic-restpage.render.restPage': RenderRestPage;
'basic-restpage.render.restPageEntry': RenderRestPageEntry;
'basic-restpage.render.wrapperFilter': RenderWrapperFilter;
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
export class ScopeModuleBasicRestpage extends BeanScopeBase {}

export interface ScopeModuleBasicRestpage {
  util: BeanScopeUtil;
locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'basic-restpage': ScopeModuleBasicRestpage;
  }
  
  

  export interface IBeanScopeLocale {
    'basic-restpage': (typeof locales)[TypeLocaleBase];
  }

  
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `basic-restpage::${K}` {
  return `basic-restpage::${key}`;
}  
/** scope: end */
