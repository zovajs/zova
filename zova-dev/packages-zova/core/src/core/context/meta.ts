import { RendererNode } from 'vue';
import { BeanSimple } from '../../bean/beanSimple.js';
import { CtxState } from './state.js';
import { CtxComponent } from './component.js';
import { CtxSSR } from './ssr.js';

export class CtxMeta extends BeanSimple {
  state: CtxState;
  component: CtxComponent;
  ssr: CtxSSR;

  get el(): RendererNode {
    return this.ctx.instance.vnode.el!;
  }

  /** @internal */
  public initialize() {
    this.state = this.bean._newBeanSimple(CtxState, true);
    this.component = this.bean._newBeanSimple(CtxComponent, false);
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
  }
}
