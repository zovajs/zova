import { defineComponent } from 'vue';

import type { IComponentOptions } from '../bean/type.js';
import type { Constructable } from '../decorator/type/constructable.js';

import { useControllerPage } from '../composables/useController.js';

export function createZovaComponentPage<M, R, S>(controller: Constructable<M>, render?: Constructable<R>, style?: Constructable<S>) {
  return defineComponent(() => {
    useControllerPage(controller, render, style);
    return () => {};
  });
}

export function prepareComponentOptions(componentOptions?: IComponentOptions) {
  return Object.assign({ inheritAttrs: 'auto' }, componentOptions);
}
