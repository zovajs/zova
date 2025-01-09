import { markRaw, toRaw } from 'vue';
import { IDecoratorVueElement } from '../../decorator/vue/types.js';
import { getVueDecoratorValue, setVueDecoratorValue } from './utils.js';

export function raw(
  beanInstance,
  _beanFullName: string,
  prop: string,
  _vueElement: IDecoratorVueElement,
  index: number,
) {
  const initialValue = beanInstance[prop];
  console.log(initialValue);
  Object.defineProperty(beanInstance, prop, {
    enumerable: false,
    configurable: true,
    get() {
      return getVueDecoratorValue(beanInstance, prop, index, () => {
        return initialValue && typeof initialValue === 'object' ? markRaw(toRaw(initialValue)) : initialValue;
      });
    },
    set(value) {
      setVueDecoratorValue(beanInstance, prop, index, markRaw(toRaw(value)));
      return true;
    },
  });
}
