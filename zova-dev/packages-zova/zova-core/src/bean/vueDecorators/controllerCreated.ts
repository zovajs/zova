import type {
  IDecoratorVueElement,
  IDecoratorVueWatchOptions,
} from '../../decorator/vueExtra/types.ts';

import { onControllerCreated } from '../../composables/onControllerCreated.ts';

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
