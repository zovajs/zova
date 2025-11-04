import type { IControllerData, ISlot, ISlotsDefault } from './type.js';
import { shallowReactive } from 'vue';
import { cast } from '../types/utils/cast.js';
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
    this.__initControllerProps(this.ctx.instance.vnode.props);
    this.app.meta.module._monkeyModuleSync('controllerDataInit', undefined, controllerData, this);
  }

  /** @internal */
  public __updateControllerData() {
    // props
    this.__initControllerProps(this.ctx.instance.vnode.props);
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

  public get $slotDefault(): ISlot | undefined {
    return cast(this.$props).slotDefault ?? this.$slots.default;
  }

  private __initControllerProps(props: unknown | undefined) {
    const propsDefault = Object.getPrototypeOf(this).constructor.$propsDefault;
    props = Object.assign({}, propsDefault, props);
    if (!this.$props) {
      this.$props = process.env.SERVER ? props : shallowReactive(props as any);
    } else {
      // hold the same $props ref
      Object.assign(this.$props as any, props);
    }
  }
}
