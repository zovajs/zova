import type { App } from 'vue';
import type { BeanContainer } from '../../bean/beanContainer.js';
import type { PluginZovaOptions } from '../../types/interface/pluginZova.js';
import type { ZovaContext } from '../context/context.js';
import type { ZovaConstant } from './constant.js';
import { markRaw } from 'vue';
import { cast } from '../../types/utils/cast.js';
import { constantDefault } from './constant.js';
import { AppMeta } from './meta.js';

export class ZovaApplication {
  private _reloadDelayTimer: number = 0;
  vue: App;
  bean: BeanContainer;
  meta: AppMeta;
  constant: ZovaConstant;
  ctx: ZovaContext;

  constructor(vue: App, ctxRoot: ZovaContext) {
    markRaw(this);
    vue.zova = this;
    this.vue = vue;
    this.ctx = ctxRoot;
    this.bean = ctxRoot.bean;
    cast(this.bean).app = this;
    ctxRoot.app = this;
    this.meta = this.bean._newBeanSimple(AppMeta, false);
    cast(ctxRoot.instance.appContext).reload = () => {
      this.reloadDelay();
    };
  }

  /** @internal */
  public async initialize({ modulesMeta, locales, AppMonkey }: PluginZovaOptions) {
    // monkey
    await this.meta.initialize(AppMonkey);
    // component
    await this.meta.component.initialize();
    // locales
    await this.meta.locale.initialize(locales);
    // errors
    await this.meta.error.initialize();
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

  public reload() {
    window.location.reload();
  }

  public reloadDelay(cancel?: boolean) {
    if (cancel) {
      if (this._reloadDelayTimer !== 0) {
        window.clearTimeout(this._reloadDelayTimer);
        this._reloadDelayTimer = 0;
      }
    } else {
      this.reloadDelay(true);
      this._reloadDelayTimer = window.setTimeout(() => {
        this.reload();
      }, 100);
    }
  }
}

declare module 'vue' {
  export interface App {
    zova: ZovaApplication;
  }
}
