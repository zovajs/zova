import { IDecoratorVueElement, IDecoratorVueWatchEffectOptions } from '../../decorator/vue/types.js';
import { watchEffect as vueWatchEffect } from 'vue';
import { getVueDecoratorValue } from './utils.js';

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
