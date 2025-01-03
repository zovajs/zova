import { CssDefault } from './bean/css.default.js';
import { createCache } from 'ant-design-vue';
import { ScopeModule } from './.metadata/this.js';
import { ThemeToken } from './themeToken.js';
import 'zova';

declare module 'zova' {
  export interface BeanBase {
    $scopeBase: ScopeModule;
    $css: CssDefault;
    $token: ThemeToken;
    $antdvStyleCache: ReturnType<typeof createCache>;
  }
}

import 'zova-module-a-style';
declare module 'zova-module-a-style' {
  export interface IThemeApplyResult {
    token: ThemeToken;
  }

  export interface IThemeHandlerApplyParams {
    token: ThemeToken;
  }
}
