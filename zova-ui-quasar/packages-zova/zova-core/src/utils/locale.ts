import { LocaleModuleNameSeparator } from '../bean/resource/locale/type.js';
import { useApp } from '../composables/useApp.js';

export function $makeLocaleMagic<T extends string>(str: T, ...args: any[]): string {
  if (!str || !str.includes(LocaleModuleNameSeparator)) return str;
  const app = useApp();
  return app.meta.text(str, ...args);
}
