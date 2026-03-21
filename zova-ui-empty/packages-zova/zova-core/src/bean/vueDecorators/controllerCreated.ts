import type { IDecoratorVueElement, IDecoratorVueWatchOptions } from '../../decorator/vueExtra/types.js';

import { onControllerCreated } from '../../composables/onControllerCreated.js';

export function controllerCreated(
  beanInstance,
  _beanFullName: string,
  _prop: string,
  vueElement: IDecoratorVueElement<IDecoratorVueWatchOptions>,
  _index: number,
) {
  const { descriptor } = vueElement;
  onControllerCreated(() => {
    return descriptor.value.call(beanInstance);
  });
}
