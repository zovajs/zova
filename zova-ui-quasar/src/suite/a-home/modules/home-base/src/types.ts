import type { ScopeModule } from './.metadata/this.js';
import type { CssDefault } from './bean/css.default.js';
import type { ThemeToken } from './themeToken.js';
import 'zova';

import 'zova-module-a-style';

declare module 'zova' {
  export interface BeanBase {
    $scopeBase: ScopeModule;
    $css: CssDefault;
    $token: ThemeToken;
  }
}

declare module 'zova-module-a-style' {
  export interface IThemeApplyResult {
    token: ThemeToken;
  }

  export interface IThemeHandlerApplyParams {
    token: ThemeToken;
  }
}
