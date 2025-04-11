import type { TypeModuleResourceConfig } from '../../types/interface/module.js';
import type { PluginZovaOptions } from '../../types/interface/pluginZova.js';
import type { ZovaConfig } from './config.js';
import type { ZovaConstant } from './constant.js';
import { BeanContainer } from '../../bean/beanContainer.js';
import { configDefault } from './config.js';
import { constantDefault } from './constant.js';
import { SysMeta } from './meta.js';
import { deepExtend, SysUtil } from './util.js';

const SymbolSysInitializePromise = Symbol('SymbolSysInitializePromise');

export class ZovaSys {
  private [SymbolSysInitializePromise]: Promise<void>;
  bean: BeanContainer;
  util: SysUtil;
  meta: SysMeta;
  config: ZovaConfig;
  constant: ZovaConstant;

  constructor() {
    this.bean = BeanContainer.create(this, null!, null);
    this.util = this.bean._newBeanSimple(SysUtil, false);
    this.meta = this.bean._newBeanSimple(SysMeta, false);
  }

  /** @internal */
  public async initialize({ modulesMeta, locales, config, SysMonkey, legacyRoutes }: PluginZovaOptions) {
    if (!this[SymbolSysInitializePromise]) {
      this[SymbolSysInitializePromise] = this._initializeInner({ modulesMeta, locales, config, SysMonkey, legacyRoutes });
    }
    return this[SymbolSysInitializePromise];
  }

  private async _initializeInner({ modulesMeta, locales, config, SysMonkey, legacyRoutes }: PluginZovaOptions) {
    // monkey
    await this.meta.initialize(SysMonkey, legacyRoutes);
    // locales
    await this.meta.locale.initialize(locales);
    // errors
    await this.meta.error.initialize();
    // // config
    this.config = await this._combineConfig(config);
    // constant
    this.constant = constantDefault;
    // module
    await this.meta.module.initialize(modulesMeta);
    // monkey: sysInitialize
    await this.meta.module._monkeyModule('sysInitialize');
    // monkey: sysInitialized
    await this.meta.module._monkeyModule('sysInitialized');
    // monkey: sysReady
    await this.meta.module._monkeyModule('sysReady');
  }

  private async _combineConfig(config: TypeModuleResourceConfig[]): Promise<ZovaConfig> {
    const _config = deepExtend({}, configDefault());
    for (const configFn of config) {
      deepExtend(_config, await configFn(this, _config.meta));
    }
    return _config;
  }
}

export const sys = new ZovaSys();
