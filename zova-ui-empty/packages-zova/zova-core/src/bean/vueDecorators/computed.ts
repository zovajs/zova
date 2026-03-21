import type { IDecoratorVueElement } from '../../decorator/vueExtra/types.js';

import { useComputed } from '../../vueExtra/computed.js';
import { getVueDecoratorValue } from './utils.js';

export function computed(beanInstance, _beanFullName: string, prop: string, vueElement: IDecoratorVueElement, index: number) {
  const { descriptor } = vueElement;
  Object.defineProperty(beanInstance, prop, {
    enumerable: false,
    configurable: true,
    get() {
      return getVueDecoratorValue(beanInstance, prop, index, () => {
        if (!descriptor.set) {
          return useComputed(() => {
            return descriptor.get?.apply(beanInstance);
          });
        } else {
          return useComputed({
            get() {
              return descriptor.get?.apply(beanInstance);
            },
            set(value) {
              descriptor.set!.call(beanInstance, value);
            },
          });
        }
      });
    },
  });
}
