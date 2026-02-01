import type { ScopeModule } from '../.metadata/this.js';
import type { CssDefault } from '../bean/css.default.js';
import 'zova';

declare module 'zova' {
  export interface BeanBase {
    $scopeBase: ScopeModule;
    $css: CssDefault;
  }
}
