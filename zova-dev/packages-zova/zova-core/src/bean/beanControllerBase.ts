import type { defineOptions } from 'vue';
import type { IControllerData } from './type.js';
import { useModel } from 'vue';
import { cast } from '../types/utils/cast.js';
import { useRef } from '../vueExtra/ref.js';
import { BeanBase } from './beanBase.js';

type Data = Record<string, unknown>;

export type IComponentOptions = Parameters<typeof defineOptions>[0];

export class BeanControllerBase extends BeanBase {
  public $props: unknown;
  public $emit: unknown;
  public $slots: unknown;
  public $attrs: Data;

  /** @internal */
  public __initControllerData(controllerData: IControllerData) {
    this.$props = controllerData.props;
    this.$emit = controllerData.context.emit;
    this.$attrs = controllerData.context.attrs as Data;
    this.$slots = useRef(() => {
      const attrSlots = cast(this.$attrs).slots;
      const contextSlots = controllerData.context.slots;
      if (!attrSlots) {
        return contextSlots;
      } else {
        return contextSlots ? Object.assign({}, attrSlots, contextSlots) : attrSlots;
      }
    });
    this.app.meta.module._monkeyModuleSync('controllerDataInit', undefined, controllerData, this);
  }

  public $useModel(name?, options?) {
    if (typeof name === 'object') {
      options = name;
      name = 'modelValue';
    }
    if (!name) name = 'modelValue';
    return useModel(this.$props as any, name, options);
  }
}
