import { shallowReactive } from 'vue';

import type { IDecoratorVueElement } from '../../decorator/vueExtra/types.ts';

import { getVueDecoratorValue, setVueDecoratorValue } from './utils.ts';

export function shallow(
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
        return initialValue && typeof initialValue === 'object'
          ? shallowReactive(initialValue)
          : initialValue;
      });
    },
    set(value) {
      setVueDecoratorValue(beanInstance, prop, index, shallowReactive(value));
      return true;
    },
  });
}
