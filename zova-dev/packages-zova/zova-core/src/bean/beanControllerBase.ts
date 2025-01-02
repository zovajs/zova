import { useModel } from 'vue';
import { BeanBase } from './beanBase.js';
import { IControllerData } from './type.js';
import { cast } from '../types/utils/cast.js';
import { useRef } from '../vue/ref.js';

type Data = Record<string, unknown>;

// type DefineModelOptions<T = any> = {
//   get?: (v: T) => any;
//   set?: (v: T) => any;
// };

export interface PropsBase {
  controllerRef?: unknown;
}

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
      // todo: remove $props.slots
      const propSlots = cast(this.$props).slots;
      const contextSlots = controllerData.context.slots;
      if (!propSlots) {
        return contextSlots;
      } else {
        return contextSlots ? Object.assign({}, propSlots, contextSlots) : propSlots;
      }
    });
    this.app.meta.module._monkeyModuleSync('controllerDataInit', undefined, controllerData, this);
  }

  // @ts-ignore ignore
  // todo: 需要通过接口合并的方式添加以下两个函数类型定义
  //protected $useModel(options?: DefineModelOptions<Props['modelValue']>): Props['modelValue'];
  //protected $useModel<K extends keyof Props>(name: K, options?: DefineModelOptions<Props[K]>): Props[K];
  protected $useModel(name?, options?) {
    if (typeof name === 'object') {
      options = name;
      name = 'modelValue';
    }
    if (!name) name = 'modelValue';
    return useModel(this.$props as any, name, options);
  }
}
