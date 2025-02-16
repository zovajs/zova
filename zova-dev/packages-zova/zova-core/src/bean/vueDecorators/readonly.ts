import type { IDecoratorVueElement } from '../../decorator/vue/types.js';
import { readonly as vueReadonly } from 'vue';
import { getVueDecoratorValue, setVueDecoratorValue } from './utils.js';

export function readonly(
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
        return initialValue && typeof initialValue === 'object' ? vueReadonly(initialValue) : initialValue;
      });
    },
    set(value) {
      setVueDecoratorValue(beanInstance, prop, index, vueReadonly(value));
      return true;
    },
  });
}
