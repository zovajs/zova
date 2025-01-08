import { IDecoratorVueElement, IDecoratorVueWatchOptions } from '../../decorator/vue/types.js';

export function watch(
  beanInstance,
  beanFullName: string,
  prop: string,
  vueElement: IDecoratorVueElement<IDecoratorVueWatchOptions>,
  index: number,
) {
  const { descriptor, options } = vueElement;
  // getter
  let getter;
  if(options?.path){
    getter=
  }
}
