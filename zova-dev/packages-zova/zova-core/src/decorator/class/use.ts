import { IBeanRecord } from '../../bean/type.js';
import { appMetadata, MetadataKey } from '../../core/metadata.js';
import { appResource } from '../../core/resource.js';
import { Constructable, IDecoratorUseOptions } from '../index.js';

export function Use(options?: IDecoratorUseOptions): PropertyDecorator & MethodDecorator;
export function Use<T extends keyof IBeanRecord>(beanFullName?: T): PropertyDecorator & MethodDecorator;
export function Use(options?: IDecoratorUseOptions | string): PropertyDecorator & MethodDecorator {
  return function (target: object, prop: MetadataKey, descriptor?: PropertyDescriptor) {
    if (!options) options = {};
    if (typeof options === 'string') {
      options = { beanFullName: options } as unknown as IDecoratorUseOptions;
    }
    // beanClass
    const beanClass = appMetadata.getDesignType(target, prop) as Constructable;
    // record
    appResource.addUse(target, {
      ...options,
      prop,
      beanClass,
      descriptor,
    });
    // chech beanClass
    if (process.env.CLIENT && process.env.NODE_ENV === 'development') {
      const moduleSource = appResource._getModuleName(beanClass);
      if (moduleSource) {
        window.setTimeout(() => {
          const moduleTarget = appResource._getModuleName(target.constructor as any);
          if (moduleSource !== moduleTarget) {
            console.error(
              `inject class should be imported by type, such as: import type { ${appResource._fixClassName(beanClass.name)} } from 'zova-module-xxx-xxx'`,
            );
          }
        }, 0);
      }
    }
  };
}

export function usePrepareArg(fn: () => any, withSelector?: boolean, markReactive?: boolean): any {
  withSelector = withSelector ?? false;
  markReactive = markReactive ?? true;
  const arg = fn();
  return {
    withSelector,
    markReactive,
    args: [arg],
  };
}

export function usePrepareArgs(fn: () => any[], withSelector?: boolean, markReactive?: boolean): any {
  withSelector = withSelector ?? false;
  markReactive = markReactive ?? true;
  const args = fn() ?? [];
  return {
    withSelector,
    markReactive,
    args,
  };
}
