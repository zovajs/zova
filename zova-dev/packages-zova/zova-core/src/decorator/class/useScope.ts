import type { IBeanScopeRecord } from '../../bean/type.js';
import type { MetadataKey } from '../../core/metadata.js';
import type { IDecoratorUseScopeOptions } from '../index.js';
import { appResource } from '../../core/resource.js';

export function UseScope(options: IDecoratorUseScopeOptions): PropertyDecorator;
export function UseScope<T extends keyof IBeanScopeRecord>(module?: T): PropertyDecorator;
export function UseScope(options?: IDecoratorUseScopeOptions | string): PropertyDecorator {
  return function (target: object, prop: MetadataKey) {
    if (!options) throw new Error('should specify the module name');
    if (typeof options === 'string') {
      options = { module: options } as unknown as IDecoratorUseScopeOptions;
    }
    const beanFullName = `${options.module}.scope.module`;
    // record
    appResource.addUse(target, {
      ...options,
      prop,
      beanFullName,
    });
  };
}
