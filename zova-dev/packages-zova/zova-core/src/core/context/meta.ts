import type { RendererNode } from 'vue';
import { BeanSimple } from '../../bean/beanSimple.js';
import { CtxComponent } from './component.js';
import { CtxHooks } from './hooks.js';
import { CtxSSR } from './ssr.js';
import { CtxState } from './state.js';

export class CtxMeta extends BeanSimple {
  state: CtxState;
  component: CtxComponent;
  hooks: CtxHooks;
  ssr: CtxSSR;

  get el(): RendererNode {
    return this.ctx.instance.vnode.el!;
  }

  /** @internal */
  public initialize() {
    this.state = this.bean._newBeanSimple(CtxState, true);
    this.component = this.bean._newBeanSimple(CtxComponent, false);
    this.hooks = this.bean._newBeanSimple(CtxHooks, false);
    if (!this.app) {
      this.ssr = this.bean._newBeanSimple(CtxSSR, false);
      this.ssr.initialize();
    } else {
      this.ssr = this.app.ctx.meta.ssr;
    }
  }

  /** @internal */
  public dispose() {
    this.component.dispose();
    this.hooks.dispose();
  }
}
