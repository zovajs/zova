import type { Component, ComponentCustomOptions } from 'vue';
import type { TypeModuleResourceComponents } from '../../types/interface/module.js';
import { BeanSimple } from '../../bean/beanSimple.js';

export class AppComponent extends BeanSimple {
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
    const module = await this.app.meta.module.use(moduleName);
    return module.resource.components[componentName2];
  }

  /** @internal */
  public _registerComponents(_moduleName: string, components: TypeModuleResourceComponents) {
    if (!components) return;
    for (const key in components) {
      const component = components[key];
      this._setComponentGlobal(component);
    }
  }

  private _setComponentGlobal(component: Component) {
    // register
    const options = component as ComponentCustomOptions;
    if (component.name && options.meta?.global === true) {
      if (!this.app.vue.component(component.name)) {
        this.app.vue.component(component.name, component);
      }
    }
    return component;
  }
}
