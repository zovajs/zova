import { MetadataKey } from '../../core/metadata.js';
import { appResource } from '../../core/resource.js';
import { Functionable, IDecoratorUseComposableOptions } from '../index.js';

export function UseComposable(
  options: IDecoratorUseComposableOptions | Functionable,
): PropertyDecorator & MethodDecorator {
  return function (target: object, prop: MetadataKey, descriptor?: PropertyDescriptor) {
    if (typeof options === 'function') {
      options = { beanComposable: options } as IDecoratorUseComposableOptions;
    }
    // record
    appResource.addUse(target, {
      ...options,
      prop,
      descriptor,
    });
  };
}
