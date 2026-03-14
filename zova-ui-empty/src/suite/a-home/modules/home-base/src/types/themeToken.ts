import 'zova-module-a-style';

export interface ThemeTokenCustom {}

declare module 'zova-module-a-style' {
  export interface ThemeToken extends ThemeTokenCustom {}
}
