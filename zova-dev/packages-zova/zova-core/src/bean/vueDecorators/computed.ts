import { IDecoratorVueElement } from '../../decorator/vue/types.js';
import { useComputed } from '../../vue/computed.js';
import { getVueDecoratorValue } from './utils.js';

export function computed(
  beanInstance,
  beanFullName: string,
  prop: string,
  vueElement: IDecoratorVueElement,
  index: number,
) {
  const { descriptor } = vueElement;
  Object.defineProperty(beanInstance, prop, {
    enumerable: false,
    configurable: true,
    get() {
      return getVueDecoratorValue(beanInstance, prop, index, () => {
        return useComputed(() => {
          return descriptor.get?.apply(beanInstance);
        });
      });
    },
    set(value) {
      if (!descriptor.set) throw new Error(`setter method not found: ${beanFullName}:${prop}`);
      descriptor.set.call(beanInstance, value);
      return true;
    },
  });
}
