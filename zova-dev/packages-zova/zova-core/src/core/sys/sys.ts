import type { PluginZovaOptions } from '../../types/interface/pluginZova.js';
import type { ZovaConfig } from '../app/config.js';
import { BeanContainer } from '../../bean/beanContainer.js';
import { SysMeta } from './meta.js';
import { SysUtil } from './util.js';

const SymbolSysInitializePromise = Symbol('SymbolSysInitializePromise');

export class ZovaSys {
  private [SymbolSysInitializePromise]: Promise<void>;
  bean: BeanContainer;
  util: SysUtil;
  meta: SysMeta;
  config: ZovaConfig;

  constructor() {
    this.bean = BeanContainer.create(this, null!, null);
    this.util = this.bean._newBeanSimple(SysUtil, false);
    this.meta = this.bean._newBeanSimple(SysMeta, false);
    this.meta.initialize();
  }

  /** @internal */
  public async initialize({ modulesMeta, locales, config, AppMonkey, legacyRoutes }: PluginZovaOptions) {
    if (!this[SymbolSysInitializePromise]) {
      this[SymbolSysInitializePromise] = this._initializeInner({ modulesMeta, locales, config, AppMonkey, legacyRoutes });
    }
    return this[SymbolSysInitializePromise];
  }

  private async _initializeInner({ modulesMeta, locales, config, AppMonkey, legacyRoutes }: PluginZovaOptions) {
    // monkey
    await this.meta.initialize(legacyRoutes);
    // component
    await this.meta.component.initialize();
    // locales
    await this.meta.locale.initialize(locales);
    // errors
    await this.meta.error.initialize();
    // config
    this.config = await this._combineConfig(config);
    // constant
    this.constant = constantDefault;
    // module
    await this.meta.module.initialize(modulesMeta);
    // monkey: appInitialize
    await this.meta.module._monkeyModule('appInitialize');
    // monkey: appInitialized
    await this.meta.module._monkeyModule('appInitialized');
    // monkey: appReady
    await this.meta.module._monkeyModule('appReady');
  }
}

export const sys = new ZovaSys();
