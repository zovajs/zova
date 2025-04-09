import type { IComponentOptions } from '../bean/type.js';
import type { Constructable } from '../decorator/type/constructable.js';
import { defineAsyncComponent, defineComponent } from 'vue';
import { useApp } from '../composables/useApp.js';
import { useControllerPage } from '../composables/useController.js';

export function createZovaComponentAsync(module, name) {
  return defineAsyncComponent(() => {
    return new Promise(resolve => {
      const app = useApp();
      app.meta.module.use(module).then(_module => {
        resolve(_module.resource.components[name] as any);
      });
    });
  });
}

export function createZovaComponentPage<M, R, S>(controller: Constructable<M>, render?: Constructable<R>, style?: Constructable<S>) {
  return defineComponent(() => {
    useControllerPage(controller, render, style);
    return () => {};
  });
}

export function prepareComponentOptions(componentOptions?: IComponentOptions) {
  return Object.assign({ inheritAttrs: ['class', 'style'] }, componentOptions);
}
