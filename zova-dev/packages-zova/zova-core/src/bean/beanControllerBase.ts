import type { IControllerData, ISlotsDefault } from './type.js';
import { shallowReactive } from 'vue';
import { useModel } from '../vueExtra/useModel.js';
import { BeanBase } from './beanBase.js';

export class BeanControllerBase extends BeanBase {
  public $props: unknown;
  public $slots: ISlotsDefault;

  /** @internal */
  public __initControllerData(controllerData: IControllerData) {
    // props
    this.$props = _initProps(this.ctx.instance.vnode.props, Object.getPrototypeOf(this).constructor.$propsDefault);
    this.$slots = controllerData.context.slots as any;
    this.app.meta.module._monkeyModuleSync('controllerDataInit', undefined, controllerData, this);
  }

  /** @internal */
  public __updateControllerProps() {
    Object.assign(this.$props as any, this.ctx.instance.vnode.props);
  }

  public $useModel(name?, options?) {
    if (typeof name === 'object') {
      options = name;
      name = 'modelValue';
    }
    if (!name) name = 'modelValue';
    return useModel.call(this, this.$props as any, name, options);
  }
}

function _initProps(props: unknown | undefined, propsDefault: unknown | undefined) {
  props = Object.assign({}, propsDefault, props);
  return process.env.SERVER ? props : shallowReactive(props as any);
}
