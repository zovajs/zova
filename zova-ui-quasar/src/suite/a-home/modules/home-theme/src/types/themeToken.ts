import 'zova-module-a-style';

export interface ThemeTokenCustom {
  color: {
    'primary': string;
    'secondary': string;
    'accent': string;
    'dark': string;
    'dark-page': string;
    'positive': string;
    'negative': string;
    'info': string;
    'warning': string;
  };
}

declare module 'zova-module-a-style' {
  export interface ThemeToken extends ThemeTokenCustom {}
}
