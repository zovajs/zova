/* eslint-disable */
/** controller: begin */
export * from '../component/restPageEntry/controller.jsx';
export * from '../component/wrapperForm/controller.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-devui-restpageentry' {
  
        export interface ControllerRestPageEntry {
          /** @internal */
          get scope(): ScopeModuleDevuiRestpageentry;
        }

        export interface ControllerWrapperForm {
          /** @internal */
          get scope(): ScopeModuleDevuiRestpageentry;
        } 
}
/** controller: end */
/** controller: begin */
import { ControllerRestPageEntry } from '../component/restPageEntry/controller.jsx';
import { ControllerWrapperForm } from '../component/wrapperForm/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'devui-restpageentry.controller.restPageEntry': ControllerRestPageEntry;
'devui-restpageentry.controller.wrapperForm': ControllerWrapperForm;
  }
}
/** controller: end */

/** components: begin */
export * from './component/restPageEntry.js';
import { ZRestPageEntry } from './component/restPageEntry.js';
export * from './component/wrapperForm.js';
import { ZWrapperForm } from './component/wrapperForm.js';
export const components = {
  'restPageEntry': ZRestPageEntry,
'wrapperForm': ZWrapperForm,
};
import 'zova';
declare module 'zova' {
export interface IComponentRecord {
  'devui-restpageentry:restPageEntry': ControllerRestPageEntry;
'devui-restpageentry:wrapperForm': ControllerWrapperForm;
}
export interface IZovaComponentRecord {
  'devui-restpageentry:restPageEntry': typeof ZRestPageEntry;
'devui-restpageentry:wrapperForm': typeof ZWrapperForm;
}
}
/** components: end */
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
