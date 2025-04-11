import type { IModule } from '@cabloy/module-info';
import { BeanBaseSimple, SymbolModuleBelong } from '../beanBaseSimple.js';
import { BeanScopeError } from '../resource/error/beanScopeError.js';
import { BeanScopeLocale } from '../resource/locale/beanScopeLocale.js';
import { BeanScopeUtil } from './beanScopeUtil.js';

const BeanModuleError = Symbol('BeanScopeBase#BeanModuleError');
const BeanModuleLocale = Symbol('BeanScopeBase#BeanModuleLocale');
const BeanModuleConfig = Symbol('BeanScopeBase#BeanModuleConfig');
const BeanModuleConstant = Symbol('BeanScopeBase#BeanModuleConstant');
const BeanModuleApi = Symbol('BeanScopeBase#BeanModuleApi');
const BeanModuleUtil = Symbol('BeanScopeBase#BeanModuleUtil');

export class BeanScopeBase extends BeanBaseSimple {
  private [BeanModuleError]: BeanScopeError;
  private [BeanModuleLocale]: BeanScopeLocale;
  private [BeanModuleConfig]: unknown;
  private [BeanModuleConstant]: unknown;
  private [BeanModuleApi]: unknown;
  private [BeanModuleUtil]: BeanScopeUtil;

  get module(): IModule {
    return this.app.meta.module.get(this[SymbolModuleBelong]) as unknown as IModule;
  }

  protected __get__(prop) {
    const moduleBelong = this[SymbolModuleBelong];
    // error
    if (prop === 'error') {
      if (!this[BeanModuleError]) {
        this[BeanModuleError] = this.bean._newBeanSimple(BeanScopeError, false, moduleBelong);
      }
      return this[BeanModuleError];
    }
    // locale
    if (prop === 'locale') {
      if (!this[BeanModuleLocale]) {
        this[BeanModuleLocale] = this.bean._newBeanSimple(BeanScopeLocale, false, moduleBelong);
      }
      return this[BeanModuleLocale];
    }
    // config
    if (prop === 'config') {
      if (!this[BeanModuleConfig]) {
        this[BeanModuleConfig] = this.sys.config.modules[moduleBelong];
      }
      return this[BeanModuleConfig];
    }
    // constant
    if (prop === 'constant') {
      if (!this[BeanModuleConstant]) {
        this[BeanModuleConstant] = this.sys.constant.modules[moduleBelong];
      }
      return this[BeanModuleConstant];
    }
    // api
    if (prop === 'api') {
      if (!this[BeanModuleApi]) {
        this[BeanModuleApi] = {};
      }
      return this[BeanModuleApi];
    }
    // util
    if (prop === 'util') {
      if (!this[BeanModuleUtil]) {
        this[BeanModuleUtil] = this.bean._newBeanSimple(BeanScopeUtil, false, moduleBelong);
      }
      return this[BeanModuleUtil];
    }
  }
}
