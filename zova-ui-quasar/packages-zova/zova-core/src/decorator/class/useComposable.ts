import type { MetadataKey } from '../../core/sys/metadata.js';
import type { Functionable, IDecoratorUseComposableOptions } from '../index.js';

import { appResource } from '../../core/sys/resource.js';

export function UseComposable(options: IDecoratorUseComposableOptions | Functionable): PropertyDecorator & MethodDecorator {
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
