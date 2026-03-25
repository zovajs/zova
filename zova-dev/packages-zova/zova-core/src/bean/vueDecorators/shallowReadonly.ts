import { shallowReadonly as vueShallowReadonly } from 'vue';

import type { IDecoratorVueElement } from '../../decorator/vueExtra/types.ts';

import { getVueDecoratorValue, setVueDecoratorValue } from './utils.ts';

export function shallowReadonly(beanInstance, _beanFullName: string, prop: string, _vueElement: IDecoratorVueElement, index: number) {
  const initialValue = beanInstance[prop];
  Object.defineProperty(beanInstance, prop, {
    enumerable: false,
    configurable: true,
    get() {
      return getVueDecoratorValue(beanInstance, prop, index, () => {
        return initialValue && typeof initialValue === 'object' ? vueShallowReadonly(initialValue) : initialValue;
      });
    },
    set(value) {
      setVueDecoratorValue(beanInstance, prop, index, vueShallowReadonly(value));
      return true;
    },
  });
}
