import type {
  IDecoratorVueElement,
  IDecoratorVueWatchOptions,
} from '../../decorator/vueExtra/types.ts';

import { onControllerMounted } from '../../composables/onControllerMounted.ts';

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
