/* eslint-disable */
/** sys: begin */
export * from '../bean/sys.appBar.jsx';
export * from '../bean/sys.icon.js';
export * from '../bean/sys.main.jsx';
export * from '../bean/sys.navigationDrawer.jsx';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-vuetify-adapter' {
  
        export interface SysAppBar {
          /** @internal */
          get scope(): ScopeModuleVuetifyAdapter;
        }

        export interface SysAppBar {
          get $beanFullName(): 'vuetify-adapter.sys.appBar';
          get $onionName(): 'vuetify-adapter:appBar';
          
        }

        export interface SysIcon {
          /** @internal */
          get scope(): ScopeModuleVuetifyAdapter;
        }

        export interface SysIcon {
          get $beanFullName(): 'vuetify-adapter.sys.icon';
          get $onionName(): 'vuetify-adapter:icon';
          
        }

        export interface SysMain {
          /** @internal */
          get scope(): ScopeModuleVuetifyAdapter;
        }

        export interface SysMain {
          get $beanFullName(): 'vuetify-adapter.sys.main';
          get $onionName(): 'vuetify-adapter:main';
          
        }

        export interface SysNavigationDrawer {
          /** @internal */
          get scope(): ScopeModuleVuetifyAdapter;
        }

        export interface SysNavigationDrawer {
          get $beanFullName(): 'vuetify-adapter.sys.navigationDrawer';
          get $onionName(): 'vuetify-adapter:navigationDrawer';
          
        } 
}
/** sys: end */
/** sys: begin */
import { SysAppBar } from '../bean/sys.appBar.jsx';
import { SysIcon } from '../bean/sys.icon.js';
import { SysMain } from '../bean/sys.main.jsx';
import { SysNavigationDrawer } from '../bean/sys.navigationDrawer.jsx';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'vuetify-adapter.sys.appBar': SysAppBar;
'vuetify-adapter.sys.icon': SysIcon;
'vuetify-adapter.sys.main': SysMain;
'vuetify-adapter.sys.navigationDrawer': SysNavigationDrawer;
  }
}
/** sys: end */
/** service: begin */
export * from '../service/locale.js';

import 'zova-module-a-bean';
declare module 'zova-module-a-bean' {
  
    export interface IServiceRecord {
      'vuetify-adapter:locale': never;
    }

  
}
declare module 'zova-module-vuetify-adapter' {
  
        export interface ServiceLocale {
          /** @internal */
          get scope(): ScopeModuleVuetifyAdapter;
        }

        export interface ServiceLocale {
          get $beanFullName(): 'vuetify-adapter.service.locale';
          get $onionName(): 'vuetify-adapter:locale';
          
        } 
}
/** service: end */
/** service: begin */
import { ServiceLocale } from '../service/locale.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'vuetify-adapter.service.locale': ServiceLocale;
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
