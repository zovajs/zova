import { watchEffect as vueWatchEffect } from 'vue';

import type { IDecoratorVueElement, IDecoratorVueWatchEffectOptions } from '../../decorator/vueExtra/types.ts';

import { getVueDecoratorValue } from './utils.ts';

export function watchEffect(
  beanInstance,
  _beanFullName: string,
  prop: string,
  vueElement: IDecoratorVueElement<IDecoratorVueWatchEffectOptions>,
  index: number,
) {
  const { descriptor, options } = vueElement;
  // watchEffect
  getVueDecoratorValue(beanInstance, prop, index, () => {
    return vueWatchEffect(() => {
      descriptor.value.call(beanInstance);
    }, options?.watchEffectOptions);
  });
}
