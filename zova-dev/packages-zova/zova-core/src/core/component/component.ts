import type { Component, ComponentCustomOptions } from 'vue';
import type { IZovaComponentRecord } from '../../bean/resource/component/type.js';
import type { TypeModuleResourceComponents } from '../../types/interface/module.js';
import { markRaw } from 'vue';
import { BeanSimple } from '../../bean/beanSimple.js';
import { createZovaComponentAsync } from '../../components/createZovaComponentAsync.js';

const SymbolZovaComponents = Symbol('SymbolZovaComponents');

export class AppComponent extends BeanSimple {
  private [SymbolZovaComponents]: Record<string, any> = {};

  /** @internal */
  public async initialize() {}

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

  public getZovaComponent<K extends keyof IZovaComponentRecord>(componentName: K): IZovaComponentRecord[K];
  public getZovaComponent(module: string, name: string);
  public getZovaComponent(module: string, name?: string) {
    const componentName = module.includes(':') ? module : `${module}:${name}`;
    if (!this[SymbolZovaComponents][componentName]) {
      this[SymbolZovaComponents][componentName] = markRaw(createZovaComponentAsync(componentName));
    }
    return this[SymbolZovaComponents][componentName];
  }
}
