import type { style } from 'typestyle';
import type { BeanTheme } from '../bean/bean.theme.js';
import 'zova';

declare module 'zova' {
  export interface BeanBase {
    $style: typeof style;
    $theme: BeanTheme;
  }
}
