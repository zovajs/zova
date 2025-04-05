import type { IDecoratorVueElement } from '../../decorator/vueExtra/types.js';
import { markRaw } from 'vue';
import { getVueDecoratorValue, setVueDecoratorValue } from './utils.js';

export function raw(
  beanInstance,
  _beanFullName: string,
  prop: string,
  _vueElement: IDecoratorVueElement,
  index: number,
) {
  const initialValue = beanInstance[prop];
  Object.defineProperty(beanInstance, prop, {
    enumerable: false,
    configurable: true,
    get() {
      return getVueDecoratorValue(beanInstance, prop, index, () => {
        return initialValue && typeof initialValue === 'object' ? markRaw(initialValue) : initialValue;
      });
    },
    set(value) {
      setVueDecoratorValue(beanInstance, prop, index, markRaw(value));
      return true;
    },
  });
}
