/* eslint-disable */
/** controller: begin */
export * from '../component/restPage/controller.jsx';
export * from '../component/wrapperFilter/controller.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-devui-restpage' {
  
        export interface ControllerRestPage {
          /** @internal */
          get scope(): ScopeModuleDevuiRestpage;
        }

        export interface ControllerWrapperFilter {
          /** @internal */
          get scope(): ScopeModuleDevuiRestpage;
        } 
}
/** controller: end */
/** controller: begin */
import { ControllerRestPage } from '../component/restPage/controller.jsx';
import { ControllerWrapperFilter } from '../component/wrapperFilter/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'devui-restpage.controller.restPage': ControllerRestPage;
'devui-restpage.controller.wrapperFilter': ControllerWrapperFilter;
  }
}
/** controller: end */

/** components: begin */
export * from './component/restPage.js';
import { ZRestPage } from './component/restPage.js';
export * from './component/wrapperFilter.js';
import { ZWrapperFilter } from './component/wrapperFilter.js';
export const components = {
  'restPage': ZRestPage,
'wrapperFilter': ZWrapperFilter,
};
import 'zova';
declare module 'zova' {
export interface IComponentRecord {
  'devui-restpage:restPage': ControllerRestPage;
'devui-restpage:wrapperFilter': ControllerWrapperFilter;
}
export interface IZovaComponentRecord {
  'devui-restpage:restPage': typeof ZRestPage;
'devui-restpage:wrapperFilter': typeof ZWrapperFilter;
}
}
/** components: end */
/** render: begin */
export * from '../component/restPage/render.jsx';
export * from '../component/wrapperFilter/render.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-devui-restpage' {
  
        export interface RenderRestPage {
          /** @internal */
          get scope(): ScopeModuleDevuiRestpage;
        }

        export interface RenderWrapperFilter {
          /** @internal */
          get scope(): ScopeModuleDevuiRestpage;
        } 
}
/** render: end */
/** render: begin */
import { RenderRestPage } from '../component/restPage/render.jsx';
import { RenderWrapperFilter } from '../component/wrapperFilter/render.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'devui-restpage.render.restPage': RenderRestPage;
'devui-restpage.render.wrapperFilter': RenderWrapperFilter;
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
export class ScopeModuleDevuiRestpage extends BeanScopeBase {}

export interface ScopeModuleDevuiRestpage {
  util: BeanScopeUtil;
locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'devui-restpage': ScopeModuleDevuiRestpage;
  }
  
  

  export interface IBeanScopeLocale {
    'devui-restpage': (typeof locales)[TypeLocaleBase];
  }

  
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `devui-restpage::${K}` {
  return `devui-restpage::${key}`;
}  
/** scope: end */
