import type { TypeLocaleBase } from 'zova';
import { $makeLocaleMagic } from 'zova';
import locale_en_us from '../config/locale/en-us.js';
import locale_zh_cn from '../config/locale/zh-cn.js';

export const locales = {
  'en-us': locale_en_us,
  'zh-cn': locale_zh_cn,
};

export function $locale<K extends keyof (typeof locales)[TypeLocaleBase]>(key: K, ...args: any[]) {
  return $makeLocaleMagic(`vuetify-form::${key}`, ...args);
}
