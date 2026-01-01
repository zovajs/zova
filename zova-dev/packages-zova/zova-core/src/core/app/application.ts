import type { App } from 'vue';
import type { BeanContainer } from '../../bean/beanContainer.js';
import type { TypeErrorsInternal } from '../../bean/resource/error/errorInternal.js';
import type { PluginZovaOptions } from '../../types/interface/pluginZova.js';
import type { ZovaContext } from '../context/context.js';
import { markRaw } from 'vue';
import { cast } from '../../types/utils/cast.js';
import { zodEnhance } from '../../utils/zod-enhance.js';
import { sys } from '../sys/sys.js';
import { AppMeta } from './meta.js';
import { AppUtil } from './util.js';

export class ZovaApplication {
  private _reloadDelayTimer: number = 0;
  vue: App;
  bean: BeanContainer;
  util: AppUtil;
  meta: AppMeta;
  ctx: ZovaContext;

  constructor(vue: App, ctxRoot: ZovaContext) {
    markRaw(this);
    vue.zova = this;
    this.vue = vue;
    this.ctx = ctxRoot;
    this.bean = ctxRoot.bean;
    cast(this.bean).app = this;
    ctxRoot.app = this;
    this.util = this.bean._newBeanSimple(AppUtil, false);
    this.meta = this.bean._newBeanSimple(AppMeta, false);
    cast(ctxRoot.instance.appContext).reload = () => {
      this.reloadDelay();
    };
    // only support client
    if (process.env.CLIENT) {
      // zod
      zodEnhance(this);
    }
  }

  /** @internal */
  public async initialize({ AppMonkey }: PluginZovaOptions) {
    // monkey
    sys.meta.module._monkeyModuleSync(true, 'sysApplicationInitialize', undefined, this);
    // meta
    await this.meta.initialize(AppMonkey);
    // component
    await this.meta.component.initialize();
    // locales
    await this.meta.locale.initialize();
    // errors
    await this.meta.error.initialize();
    // module
    await this.meta.module.initialize();
    // monkey: appInitialize
    await this.meta.module._monkeyModule(true, 'appInitialize');
    // monkey: appInitialized
    await this.meta.module._monkeyModule(true, 'appInitialized');
    // monkey: appReady
    await this.meta.module._monkeyModule(true, 'appReady');
  }

  public get sys() {
    return sys;
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

  public throw(code: keyof TypeErrorsInternal | number, ...args: any[]): never {
    return this.meta.error.throw(undefined, code, ...args);
  }
}

declare module 'vue' {
  export interface App {
    zova: ZovaApplication;
  }
}
