import type { Component } from 'vue';
import { BeanSimple } from '../../bean/beanSimple.js';

export class SysComponent extends BeanSimple {
  /** @internal */
  public async initialize() {}

  public createAsyncComponent(module: string, name?: string) {
    return () => {
      return this.use(module, name);
    };
    // should not use defineAsyncComponent
    // return defineAsyncComponent(() => {
    //   return this.use(componentName);
    // });
  }

  public async use(module: string, name?: string): Promise<Component> {
    if (module.includes(':')) {
      const parts = module.split(':');
      module = parts[0];
      name = parts[1];
    }
    const _module = await this.sys.meta.module.use(module);
    return _module.resource.components[name!];
  }
}
