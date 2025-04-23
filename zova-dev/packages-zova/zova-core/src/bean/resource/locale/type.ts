export const LocaleModuleNameSeparator = '::';

export interface IModuleLocale {
  (...args: any[]): string;
  locale: <T extends keyof ILocaleInfos>(locale: T, ...args: any[]) => string;
}

export interface IModuleLocaleText {
  (text: string, ...args: any[]): string;
  locale: <T extends keyof ILocaleInfos>(locale: T, text: string, ...args: any[]) => string;
}

export type TypeModuleLocales<T> = {
  [prop in keyof T]: IModuleLocale;
};

export type TypeLocaleBase = 'en-us';

export interface ILocaleInfo {}
export interface ILocaleInfos {
  'en-us': ILocaleInfo;
  'zh-cn': ILocaleInfo;
}
