import { onControllerMounted } from '../../composables/onControllerMounted.js';
import { IDecoratorVueElement, IDecoratorVueWatchOptions } from '../../decorator/vue/types.js';

export function controllerMounted(
  beanInstance,
  _beanFullName: string,
  _prop: string,
  vueElement: IDecoratorVueElement<IDecoratorVueWatchOptions>,
  _index: number,
) {
  const { descriptor } = vueElement;
  onControllerMounted(() => {
    descriptor.value.call(beanInstance);
  });
}
