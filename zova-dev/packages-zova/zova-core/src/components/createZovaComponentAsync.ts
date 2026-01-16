import type { ZovaApplication } from '../core/app/application.js';
import { defineAsyncComponent } from 'vue';
import { useSys } from '../composables/useSys.js';

export function createZovaComponentAsync(module: string, name?: string) {
  return defineAsyncComponent(() => {
    return new Promise(resolve => {
      const sys = useSys();
      if (module.includes(':')) {
        const parts = module.split(':');
        module = parts[0];
        name = parts[1];
      }
      sys.meta.module.use(module).then(_module => {
        resolve(_module.resource.components[name!] as any);
      });
    });
  });
}

export function createZovaComponentAsyncWithApp(app: ZovaApplication, module: string, name?: string) {
  return defineAsyncComponent(() => {
    return new Promise(resolve => {
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
