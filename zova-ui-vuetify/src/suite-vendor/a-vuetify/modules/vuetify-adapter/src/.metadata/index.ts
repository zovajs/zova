/* eslint-disable */
/** service: begin */
export * from '../bean/local.icon.jsx';

import 'zova-module-a-bean';
declare module 'zova-module-a-bean' {
  
    export interface IServiceRecord {
      'vuetify-adapter:icon': never;
    }

  
}
declare module 'zova-module-vuetify-adapter' {
  
        export interface ServiceIcon {
          /** @internal */
          get scope(): ScopeModuleVuetifyAdapter;
        }

        export interface ServiceIcon {
          get $beanFullName(): 'vuetify-adapter.service.icon';
          get $onionName(): 'vuetify-adapter:icon';
          
        } 
}
/** service: end */
/** service: begin */
import { ServiceIcon } from '../bean/local.icon.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'vuetify-adapter.service.icon': ServiceIcon;
  }
}
/** service: end */
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
