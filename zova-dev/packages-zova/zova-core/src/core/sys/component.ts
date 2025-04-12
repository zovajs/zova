import type { Component } from 'vue';
import { BeanSimple } from '../../bean/beanSimple.js';

export class SysComponent extends BeanSimple {
  /** @internal */
  public async initialize() {}

  public createAsyncComponent(componentName: string) {
    return () => {
      return this.use(componentName);
    };
    // should not use defineAsyncComponent
    // return defineAsyncComponent(() => {
    //   return this.use(componentName);
    // });
  }

  public async use(componentName: string): Promise<Component> {
    const [moduleName, componentName2] = componentName.split(':');
    const module = await this.sys.meta.module.use(moduleName);
    return module.resource.components[componentName2];
  }
}
