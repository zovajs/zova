import { ComponentInternalInstance, markRaw } from 'vue';
import { ZovaApplication } from '../app/application.js';
import { BeanContainer } from '../../bean/beanContainer.js';
import { CtxMeta } from './meta.js';
import { Cast } from '../../types/utils/cast.js';
import { CtxUtil } from './util.js';

export class ZovaContext {
  instance: ComponentInternalInstance;
  app: ZovaApplication;
  bean: BeanContainer;
  util: CtxUtil;
  meta: CtxMeta;
  //config: ContextConfig;

  constructor(instance: ComponentInternalInstance) {
    markRaw(this);
    instance.zova = this;
    this.instance = instance;
    this.app = instance.appContext.app.zova;
    this.bean = BeanContainer.create(this.app, this);
    this.util = this.bean._newBeanSimple(CtxUtil, false);
    this.meta = this.bean._newBeanSimple(CtxMeta, false);
    this.meta.initialize();
  }

  /** @internal */
  public dispose() {
    this.meta.dispose();
    cast(this.instance).zova = null;
    cast(this).instance = null;
    cast(this).app = null;
    cast(this).bean = null;
    cast(this).meta = null;
  }
}

declare module 'vue' {
  export interface ComponentInternalInstance {
    zova: ZovaContext;
  }
}
