import { appResource } from '../../core/resource.js';
import { Constructable, IDecoratorStoreOptions } from '../index.js';

export function Store(options?: IDecoratorStoreOptions): ClassDecorator {
  return function (target) {
    if (!options) options = {};
    // add
    appResource.addBean({
      scene: options.scene || 'store',
      name: options.name,
      containerScope: 'app',
      markReactive: options.markReactive,
      beanClass: target as unknown as Constructable,
    });
  };
}
