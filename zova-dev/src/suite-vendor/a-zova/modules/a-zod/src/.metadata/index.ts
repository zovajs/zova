/** main: end */
/** scope: begin */
import type { BeanScopeUtil, TypeLocaleBase, TypeModuleLocales } from 'zova';
import { BeanScopeBase } from 'zova';
import { Scope } from 'zova-module-a-bean';
/** locale: begin */
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';

import 'zova';

export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};
/** locale: end */
/** main: begin */
export * from '../main.js';

@Scope()
export class ScopeModuleAZod extends BeanScopeBase {}

export interface ScopeModuleAZod {
  util: BeanScopeUtil;
  locale: TypeModuleLocales<(typeof locales)[TypeLocaleBase]>;
}
declare module 'zova' {
  export interface IBeanScopeRecord {
    'a-zod': ScopeModuleAZod;
  }

  export interface IBeanScopeLocale {
    'a-zod': (typeof locales)[TypeLocaleBase];
  }
}

export function locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K): `a-zod::${K}` {
  return `a-zod::${key}`;
}
/** scope: end */
