import type { CssDefault } from '../bean/css.default.js';
import 'zova';

declare module 'zova' {
  export interface BeanBase {
    $css: CssDefault;
  }
}
