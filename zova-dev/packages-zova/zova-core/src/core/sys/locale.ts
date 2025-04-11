import type { TypeModuleResourceLocaleModules, TypeModuleResourceLocales } from '../../types/interface/module.js';
import type { ZovaLocaleOptionalMap } from '../app/locale.js';
import { BeanSimple } from '../../bean/beanSimple.js';

export class SysLocale extends BeanSimple {
  /** @internal */
  public locales: TypeModuleResourceLocales = {};
  public localeModules: TypeModuleResourceLocaleModules = {};

  /** @internal */
  public async initialize(locales: ZovaLocaleOptionalMap) {
    for (const locale in locales) {
      const moduleMap = locales[locale].modules;
      for (const moduleName in moduleMap) {
        this._registerLocale(moduleName, locale, moduleMap[moduleName]);
      }
    }
  }

  /** @internal */
  public _registerLocales(moduleName: string, locales: TypeModuleResourceLocales) {
    if (!locales) return;
    for (const locale in locales) {
      this._registerLocale(moduleName, locale, locales[locale]);
    }
  }

  private _registerLocale(moduleName: string, locale: string, moduleLocales: object) {
    // locales
    this.locales[locale] = Object.assign({}, moduleLocales, this.locales[locale]);
    // localeModules
    if (!this.localeModules[moduleName]) this.localeModules[moduleName] = {};
    this.localeModules[moduleName][locale] = Object.assign({}, moduleLocales, this.localeModules[moduleName][locale]);
  }
}
