/* eslint-disable */
/** sys: begin */
export * from '../bean/sys.icon.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-vuetify-adapter' {
  
        export interface SysIcon {
          /** @internal */
          get scope(): ScopeModuleVuetifyAdapter;
        }

        export interface SysIcon {
          get $beanFullName(): 'vuetify-adapter.sys.icon';
          get $onionName(): 'vuetify-adapter:icon';
          
        } 
}
/** sys: end */
/** sys: begin */
import { SysIcon } from '../bean/sys.icon.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'vuetify-adapter.sys.icon': SysIcon;
  }
}
/** sys: end */
/** meta: begin */
export * from '../bean/meta.themeHandler.js';

import 'zova-module-a-meta';
declare module 'zova-module-a-meta' {
  
    export interface IMetaRecord {
      'vuetify-adapter:themeHandler': never;
    }

  
}
declare module 'zova-module-vuetify-adapter' {
  
        export interface MetaThemeHandler {
          /** @internal */
          get scope(): ScopeModuleVuetifyAdapter;
        }

        export interface MetaThemeHandler {
          get $beanFullName(): 'vuetify-adapter.meta.themeHandler';
          get $onionName(): 'vuetify-adapter:themeHandler';
          
        } 
}
/** meta: end */
/** meta: begin */
import { MetaThemeHandler } from '../bean/meta.themeHandler.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'vuetify-adapter.meta.themeHandler': MetaThemeHandler;
  }
}
/** meta: end */
/** monkey: begin */
export * from '../monkey.js';
/** monkey: end */
/** monkeySys: begin */
export * from '../monkeySys.js';
/** monkeySys: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleVuetifyAdapter extends BeanScopeBase {}

export interface ScopeModuleVuetifyAdapter {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'vuetify-adapter': ScopeModuleVuetifyAdapter;
  }
  
  

  

  
}
  
/** scope: end */
