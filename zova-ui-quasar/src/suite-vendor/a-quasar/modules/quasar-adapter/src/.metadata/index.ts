// eslint-disable
/** model: begin */
export * from '../model/theme.js';
import { IModelOptionsTheme } from '../model/theme.js';
import 'zova-module-a-model';
declare module 'zova-module-a-model' {
  
    export interface IModelRecord {
      'quasar-adapter:theme': IModelOptionsTheme;
    }

  
}
declare module 'zova-module-quasar-adapter' {
  
        export interface ModelTheme {
          /** @internal */
          get scope(): ScopeModuleQuasarAdapter;
        }

        export interface ModelTheme {
          get $beanFullName(): 'quasar-adapter.model.theme';
          get $onionName(): 'quasar-adapter:theme';
          get $onionOptions(): IModelOptionsTheme;
        } 
}
/** model: end */
/** model: begin */
import { ModelTheme } from '../model/theme.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'quasar-adapter.model.theme': ModelTheme;
  }
}
/** model: end */
/** sys: begin */
export * from '../bean/sys.icon.js';

import 'zova';
declare module 'zova' {
  
  
}
declare module 'zova-module-quasar-adapter' {
  
        export interface SysIcon {
          /** @internal */
          get scope(): ScopeModuleQuasarAdapter;
        }

        export interface SysIcon {
          get $beanFullName(): 'quasar-adapter.sys.icon';
          get $onionName(): 'quasar-adapter:icon';
          
        } 
}
/** sys: end */
/** sys: begin */
import { SysIcon } from '../bean/sys.icon.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordGeneral {
    'quasar-adapter.sys.icon': SysIcon;
  }
}
/** sys: end */
/** meta: begin */
export * from '../bean/meta.themeHandler.js';

import 'zova-module-a-meta';
declare module 'zova-module-a-meta' {
  
    export interface IMetaRecord {
      'quasar-adapter:themeHandler': never;
    }

  
}
declare module 'zova-module-quasar-adapter' {
  
        export interface MetaThemeHandler {
          /** @internal */
          get scope(): ScopeModuleQuasarAdapter;
        }

        export interface MetaThemeHandler {
          get $beanFullName(): 'quasar-adapter.meta.themeHandler';
          get $onionName(): 'quasar-adapter:themeHandler';
          
        } 
}
/** meta: end */
/** meta: begin */
import { MetaThemeHandler } from '../bean/meta.themeHandler.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'quasar-adapter.meta.themeHandler': MetaThemeHandler;
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
export class ScopeModuleQuasarAdapter extends BeanScopeBase {}

export interface ScopeModuleQuasarAdapter {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'quasar-adapter': ScopeModuleQuasarAdapter;
  }
  
  

  

  
}
  
/** scope: end */
