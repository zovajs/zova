import type { IControllerData, ISlotsDefault } from './type.js';
import { shallowReactive } from 'vue';
import { useModel } from '../vueExtra/useModel.js';
import { BeanBase } from './beanBase.js';

export class BeanControllerBase extends BeanBase {
  public $props: unknown;
  public $slots: ISlotsDefault;

  /** @internal */
  public __initControllerData(controllerData: IControllerData) {
    // slots
    this.$slots = controllerData.context.slots as any;
    // props
    this.$props = this.__initControllerProps(this.ctx.instance.vnode.props);
    this.app.meta.module._monkeyModuleSync('controllerDataInit', undefined, controllerData, this);
  }

  /** @internal */
  public __updateControllerData() {
    // props
    this.$props = this.__initControllerProps(this.ctx.instance.vnode.props);
    this.app.meta.module._monkeyModuleSync('controllerDataUpdate', undefined, this);
  }

  public $useModel(name?, options?) {
    if (typeof name === 'object') {
      options = name;
      name = 'modelValue';
    }
    if (!name) name = 'modelValue';
    return useModel.call(this, this.$props as any, name, options);
  }

  private __initControllerProps(props: unknown | undefined) {
    const propsDefault = Object.getPrototypeOf(this).constructor.$propsDefault;
    props = Object.assign({}, propsDefault, props);
    return process.env.SERVER ? props : shallowReactive(props as any);
  }
}
