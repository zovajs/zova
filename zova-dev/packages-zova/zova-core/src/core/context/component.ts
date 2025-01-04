import { BeanSimple } from '../../bean/beanSimple.js';
import { BeanControllerIdentifier, BeanRenderIdentifier } from '../../bean/type.js';
import { cast } from '../../types/utils/cast.js';

export class CtxComponent extends BeanSimple {
  private _bean_render_original: any;

  activate() {
    const renderMethod = 'render';
    const self = this;
    const instance = cast(this.ctx.instance);
    this._bean_render_original = instance[renderMethod];
    instance[renderMethod] = function (this, ...args) {
      if (instance.isUnmounted) return;
      if (!self.ctx.meta.state.inited.state) {
        return self._bean_render_original.call(this, ...args);
      }
      // todo: BeanControllerPageBase/BeanControllerBase需要增加render方法的类型定义
      // protected render()
      // BeanRenderBase不需要render方法的定义
      const render = self._getRender();
      if (!render) {
        return self._bean_render_original.call(this, ...args);
        // throw new Error('render bean not found');
      }
      // need not use ctx.util.instanceScope, since ctx.instance = getCurrentInstance()
      return render.render();
    };
    instance.type.ssrRender = null;
  }

  /** @internal */
  public dispose() {
    const renderMethod = 'render';
    const instance = cast(this.ctx.instance);
    instance[renderMethod] = this._bean_render_original;
    this._bean_render_original = null;
  }

  private _getRender() {
    const render = this.bean._getBeanSyncOnly<any>(BeanControllerIdentifier);
    if (!render) return;
    if (render.render) return render;
    return this.bean._getBeanSyncOnly(BeanRenderIdentifier);
  }
}
