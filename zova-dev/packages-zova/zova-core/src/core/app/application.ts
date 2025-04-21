import type { App } from 'vue';
import type { BeanContainer } from '../../bean/beanContainer.js';
import type { ErrorSSR } from '../../bean/resource/error/type.js';
import type { HttpStatus } from '../../types/enum/httpStatus.js';
import type { PluginZovaOptions } from '../../types/interface/pluginZova.js';
import type { ZovaContext } from '../context/context.js';
import { combineQueries } from '@cabloy/utils';
import { markRaw } from 'vue';
import { cast } from '../../types/utils/cast.js';
import { sys } from '../sys/sys.js';
import { AppMeta } from './meta.js';

export class ZovaApplication {
  private _reloadDelayTimer: number = 0;
  vue: App;
  bean: BeanContainer;
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
    this.meta = this.bean._newBeanSimple(AppMeta, false);
    cast(ctxRoot.instance.appContext).reload = () => {
      this.reloadDelay();
    };
  }

  /** @internal */
  public async initialize({ AppMonkey }: PluginZovaOptions) {
    // monkey
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

  public throw(code: HttpStatus | number | string, ...args: any[]): never {
    return this.meta.error.throw(undefined, code, ...args);
  }

  public redirect(pagePath: string, status?: 301 | 302): never {
    const error = new Error() as ErrorSSR;
    error.code = status ?? 302;
    error.message = pagePath;
    error.pagePath = pagePath;
    error.url = sys.util.getAbsoluteUrlFromPagePath(pagePath, true);
    throw error;
  }

  public gotoPage(pagePath: string, forceRedirect?: boolean) {
    if (process.env.SERVER || forceRedirect) {
      return this.redirect(pagePath);
    }
    cast(this.meta).$router.replace(pagePath);
  }

  public gotoHome() {
    return this.gotoPage(sys.config.router.pageHome);
  }

  public gotoLogin(returnTo?: string) {
    returnTo = returnTo ?? this.getCurrentPagePath();
    const pageLogin = sys.config.router.pageLogin;
    const pagePath = returnTo === sys.config.router.pageHome
      ? pageLogin
      : combineQueries(pageLogin, {
          [sys.config.router.keyReturnTo]: returnTo,
        });
    return this.gotoPage(pagePath);
  }

  public gotoReturnTo(returnTo?: string) {
    const pagePath = returnTo ?? cast(this.meta).$router.currentRoute?.query?.[sys.config.router.keyReturnTo] ?? sys.config.router.pageHome;
    return this.gotoPage(pagePath);
  }

  public getCurrentPagePath() {
    if (process.env.SERVER) {
      return sys.util.getPagePathFromAbsoluteUrl(this.ctx.meta.ssr.context.req.url);
    }
    return cast(this.meta).$router.currentRoute?.fullPath;
  }
}

declare module 'vue' {
  export interface App {
    zova: ZovaApplication;
  }
}
