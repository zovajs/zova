import { appResource } from '../../core/resource.js';
import { Constructable, IDecoratorServiceOptions } from '../index.js';

export function Service(options?: IDecoratorServiceOptions): ClassDecorator {
  return function (target) {
    if (!options) options = {};
    // add
    appResource.addBean({
      scene: options.scene || 'service',
      name: options.name,
      containerScope: 'ctx',
      markReactive: options.markReactive,
      beanClass: target as unknown as Constructable,
    });
  };
}
