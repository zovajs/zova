import type { ComponentInternalInstance } from 'vue';
import type { ZovaApplication } from '../app/application.js';
import { markRaw } from 'vue';
import { BeanContainer } from '../../bean/beanContainer.js';
import { cast } from '../../types/utils/cast.js';
import { sys } from '../sys/sys.js';
import { CtxMeta } from './meta.js';
import { CtxUtil } from './util.js';

export class ZovaContext {
  instance: ComponentInternalInstance;
  app: ZovaApplication;
  bean: BeanContainer;
  util: CtxUtil;
  meta: CtxMeta;
  disposed: boolean;
  // config: ContextConfig;

  constructor(instance: ComponentInternalInstance) {
    markRaw(this);
    instance.zova = this;
    this.instance = instance;
    this.app = instance.appContext.app.zova;
    this.bean = BeanContainer.create(sys, this.app, this);
    this.util = this.bean._newBeanSimple(CtxUtil, false);
    this.meta = this.bean._newBeanSimple(CtxMeta, false);
    this.meta.initialize();
    this._zovaHostProviders();
  }

  /** @internal */
  public dispose() {
    if (this.disposed) return;
    this.meta.dispose();
    cast(this.instance).zova = null;
    cast(this).instance = null;
    cast(this).app = null;
    cast(this).bean = null;
    cast(this).meta = null;
    this.disposed = true;
  }

  private _zovaHostProviders() {
    const zovaHostProviders = cast(this.instance).zovaHostProviders;
    if (!zovaHostProviders) return;
    for (const key in zovaHostProviders) {
      const beanInstance = this.bean._getBeanSyncOnly(key);
      if (beanInstance !== zovaHostProviders[key]) {
        this.bean._setBean(key, zovaHostProviders[key]);
      }
    }
  }
}

declare module 'vue' {
  export interface ComponentInternalInstance {
    zova: ZovaContext;
  }
}
