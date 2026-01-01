import type { TypeModuleResourceConfig } from '../../types/interface/module.js';
import type { PluginZovaOptions } from '../../types/interface/pluginZova.js';
import type { ZovaConfigEnv } from '../../types/utils/env.js';
import type { ZovaConfig } from './config.js';
import type { ZovaConstant } from './constant.js';
import { BeanContainer } from '../../bean/beanContainer.js';
import { zodEnhanceSys } from '../../utils/zod-enhance.js';
import { configDefault } from './config.js';
import { constantDefault } from './constant.js';
import { SysMeta } from './meta.js';
import { setSys } from './sysFake.js';
import { deepExtend, SysUtil } from './util.js';

const SymbolSysInitializePromise = Symbol('SymbolSysInitializePromise');
const SymbolSysClosePromise = Symbol('SymbolSysClosePromise');

export class ZovaSys {
  private [SymbolSysInitializePromise]: Promise<void>;
  private [SymbolSysClosePromise]: Promise<void>;
  bean: BeanContainer;
  util: SysUtil;
  meta: SysMeta;
  config: ZovaConfig;
  env: ZovaConfigEnv;
  constant: ZovaConstant;

  constructor() {
    this.bean = BeanContainer.create(this, null!, null);
    this.util = this.bean._newBeanSimple(SysUtil, false);
    this.meta = this.bean._newBeanSimple(SysMeta, false);
    // zod
    zodEnhanceSys();
  }

  /** @internal */

  public async initialize({ modulesMeta, locales, config, env, SysMonkey, legacyRoutes }: PluginZovaOptions, envRuntime?: Partial<ZovaConfigEnv>) {
    if (!this[SymbolSysInitializePromise]) {
      this[SymbolSysInitializePromise] = this._initializeInner({ modulesMeta, locales, config, env, SysMonkey, legacyRoutes }, envRuntime);
    }
    return this[SymbolSysInitializePromise];
  }

  private async _initializeInner(
    { modulesMeta, locales, config, env, SysMonkey, legacyRoutes }: PluginZovaOptions,
    envRuntime?: Partial<ZovaConfigEnv>,
  ) {
    // env
    this.env = this._prepareEnv(env, envRuntime);
    // monkey
    await this.meta.initialize(SysMonkey, legacyRoutes);
    // component
    await this.meta.component.initialize();
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
    await this.meta.module._monkeyModule(true, 'sysInitialize');
    // monkey: sysInitialized
    await this.meta.module._monkeyModule(true, 'sysInitialized');
    // monkey: sysReady
    await this.meta.module._monkeyModule(true, 'sysReady');
    // hookClose
    this._hookClose();
  }

  private _hookClose() {
    if (process.env.DEV && import.meta.hot) {
      import.meta.hot.on('vite:beforeFullReload', _payload => {
        this.close();
      });
    }
    if (process.env.CLIENT && typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => {
        this.close();
      });
    }
  }

  public async close() {
    if (!this[SymbolSysClosePromise]) {
      this[SymbolSysClosePromise] = this._closeInner();
    }
    return this[SymbolSysClosePromise];
  }

  private async _closeInner() {
    // monkey: sysClose
    await this.meta.module._monkeyModule(false, 'sysClose');
  }

  private async _combineConfig(config: TypeModuleResourceConfig[]): Promise<ZovaConfig> {
    const _config = deepExtend({}, configDefault(this.env));
    for (const configFn of config) {
      deepExtend(_config, await configFn(this, _config.meta));
    }
    return _config;
  }

  // eslint-disable-next-line no-undef
  private _prepareEnv(env: NodeJS.ProcessEnv, envRuntime?: Partial<ZovaConfigEnv>): ZovaConfigEnv {
    if (!envRuntime) return env as unknown as ZovaConfigEnv;
    const env2 = { ...env };
    for (const key of Object.keys(env2)) {
      if (envRuntime[key] !== undefined) {
        env2[key] = envRuntime[key];
      }
    }
    return env2 as unknown as ZovaConfigEnv;
  }
}

export const sys = new ZovaSys();
setSys(sys);
if (process.env.CLIENT) {
  window.sys = sys;
}
