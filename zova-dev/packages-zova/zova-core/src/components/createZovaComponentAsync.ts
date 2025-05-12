import { defineAsyncComponent } from 'vue';
import { useApp } from '../composables/useApp.js';

export function createZovaComponentAsync(module: string, name?: string) {
  return defineAsyncComponent(() => {
    return new Promise(resolve => {
      const app = useApp();
      if (module.includes(':')) {
        const parts = module.split(':');
        module = parts[0];
        name = parts[1];
      }
      app.meta.module.use(module).then(_module => {
        resolve(_module.resource.components[name!] as any);
      });
    });
  });
}
