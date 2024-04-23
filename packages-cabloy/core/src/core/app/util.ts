import { extend } from '@cabloy/extend';
import { BeanSimple } from '../../bean/beanSimple.js';
import uuid from 'uuid-random';
import { IModuleRouteComponent } from '../../bean/index.js';

export class AppUtil extends BeanSimple {
  uuid(): string {
    return uuid();
  }

  isUuid(str: string): boolean {
    if (!str) return false;
    const length = str.length;
    return length === 36 || length === 32;
  }

  isNullOrEmptyString(str?: string | undefined | null): boolean {
    return str === undefined || str === null || str === '';
  }

  async sleep(ms: number) {
    return new Promise(reslove => {
      window.setTimeout(() => {
        reslove(null);
      }, ms);
    });
  }

  extend(...args) {
    return extend(true, ...args);
  }

  createAsyncComponent(component: string | IModuleRouteComponent) {
    if (typeof component !== 'string') return component;
    return async () => {
      const [moduleName, componentName] = component.split(':');
      const module = await this.app.meta.module.use(moduleName);
      return module.resource.components[componentName];
    };
  }

  defineProperty<T>(obj: T, prop: string, attributes: PropertyDescriptor & ThisType<any>): T {
    const self = this;
    const attrs = { ...attributes };
    if (attributes.get) {
      attrs.get = function () {
        const innerKey = `__innerKey_${prop}`;
        if (!obj[innerKey]) {
          self.app.vue.runWithContext(() => {
            obj[innerKey] = attributes.get!();
          });
        }
        return obj[innerKey];
      };
    }
    return Object.defineProperty(obj, prop, attrs);
  }
}
