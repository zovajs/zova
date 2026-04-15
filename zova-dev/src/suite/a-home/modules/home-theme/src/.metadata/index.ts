// eslint-disable
/** css: begin */
export * from '../bean/css.default.js';
import { ICssOptionsDefault } from '../bean/css.default.js';
import 'zova-module-a-style';
declare module 'zova-module-a-style' {
  
    export interface ICssRecord {
      'home-theme:default': ICssOptionsDefault;
    }

  
}
declare module 'zova-module-home-theme' {
  
        export interface CssDefault {
          /** @internal */
          get scope(): ScopeModuleHomeTheme;
        }

        export interface CssDefault {
          get $beanFullName(): 'home-theme.css.default';
          get $onionName(): 'home-theme:default';
          get $onionOptions(): ICssOptionsDefault;
        } 
}
/** css: end */
/** css: begin */
import { CssDefault } from '../bean/css.default.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-theme.css.default': CssDefault;
  }
}
/** css: end */
/** theme: begin */
export * from '../bean/theme.default.js';
import { IThemeOptionsDefault } from '../bean/theme.default.js';
import 'zova-module-a-style';
declare module 'zova-module-a-style' {
  
    export interface IThemeRecord {
      'home-theme:default': IThemeOptionsDefault;
    }

  
}
declare module 'zova-module-home-theme' {
  
        export interface ThemeDefault {
          /** @internal */
          get scope(): ScopeModuleHomeTheme;
        }

        export interface ThemeDefault {
          get $beanFullName(): 'home-theme.theme.default';
          get $onionName(): 'home-theme:default';
          get $onionOptions(): IThemeOptionsDefault;
        } 
}
/** theme: end */
/** theme: begin */
import { ThemeDefault } from '../bean/theme.default.js';
import 'zova';
declare module 'zova' {
  export interface IBeanRecordLocal {
    'home-theme.theme.default': ThemeDefault;
  }
}
/** theme: end */
/** scope: begin */
import { BeanScopeBase, type BeanScopeUtil } from 'zova';
import { Scope } from 'zova-module-a-bean';

@Scope()
export class ScopeModuleHomeTheme extends BeanScopeBase {}

export interface ScopeModuleHomeTheme {
  util: BeanScopeUtil;
}

import 'zova';
declare module 'zova' {
  export interface IBeanScopeRecord {
    'home-theme': ScopeModuleHomeTheme;
  }
  
  

  

  
}
  
/** scope: end */
