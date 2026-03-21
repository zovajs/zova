import type { IDecoratorVueElement, IDecoratorVueWatchOptions } from '../../decorator/vueExtra/types.js';

import { onControllerMounted } from '../../composables/onControllerMounted.js';

export function controllerMounted(
  beanInstance,
  _beanFullName: string,
  _prop: string,
  vueElement: IDecoratorVueElement<IDecoratorVueWatchOptions>,
  _index: number,
) {
  const { descriptor } = vueElement;
  onControllerMounted(() => {
    return descriptor.value.call(beanInstance);
  });
}
