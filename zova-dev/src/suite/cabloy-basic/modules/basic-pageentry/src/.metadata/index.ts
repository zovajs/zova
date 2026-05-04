// eslint-disable
/** controller: begin */
export * from '../component/blockPageEntry/controller.jsx';
export * from '../component/blockToolbarRow/controller.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-basic-pageentry' {
  
        export interface ControllerBlockPageEntry {
          /** @internal */
          get scope(): ScopeModuleBasicPageentry;
        }

        export interface ControllerBlockToolbarRow {
          /** @internal */
          get scope(): ScopeModuleBasicPageentry;
        } 
}
/** controller: end */
/** controller: begin */
import { ControllerBlockPageEntry } from '../component/blockPageEntry/controller.jsx';
import { ControllerBlockToolbarRow } from '../component/blockToolbarRow/controller.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'basic-pageentry.controller.blockPageEntry': ControllerBlockPageEntry;
'basic-pageentry.controller.blockToolbarRow': ControllerBlockToolbarRow;
  }
}
/** controller: end */

/** components: begin */
export * from './component/blockPageEntry.js';
import { ZBlockPageEntry } from './component/blockPageEntry.js';
export * from './component/blockToolbarRow.js';
import { ZBlockToolbarRow } from './component/blockToolbarRow.js';
export const components = {
  'blockPageEntry': ZBlockPageEntry,
'blockToolbarRow': ZBlockToolbarRow,
};
import 'zova';
declare module 'zova' {
export interface IComponentRecord {
  'basic-pageentry:blockPageEntry': ControllerBlockPageEntry;
'basic-pageentry:blockToolbarRow': ControllerBlockToolbarRow;
}
export interface IZovaComponentRecord {
  'basic-pageentry:blockPageEntry': typeof ZBlockPageEntry;
'basic-pageentry:blockToolbarRow': typeof ZBlockToolbarRow;
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
export class ScopeModuleBasicPageentry extends BeanScopeBase {}

export interface ScopeModuleBasicPageentry {
  util: BeanScopeUtil;
locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'basic-pageentry': ScopeModuleBasicPageentry;
  }
  
  

  export interface IBeanScopeLocale {
    'basic-pageentry': (typeof locales)[TypeLocaleBase];
  }

  
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `basic-pageentry::${K}` {
  return `basic-pageentry::${key}`;
}  
/** scope: end */
