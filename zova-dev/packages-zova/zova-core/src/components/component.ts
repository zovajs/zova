import { createVNode, defineAsyncComponent, defineComponent } from 'vue';
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

export function createZovaComponentPage(controller: any) {
  return defineComponent(() => {
    useControllerPage(controller, undefined, undefined);
    return () => {
      return createVNode('template');
    };
  });
}
