import { appResource } from '../../core/resource.js';
import { Constructable, IDecoratorStyleOptions } from '../index.js';

export function Style(options?: IDecoratorStyleOptions): ClassDecorator {
  return function (target) {
    if (!options) options = {};
    // add
    appResource.addBean({
      scene: options.scene || 'style',
      name: options.name,
      containerScope: 'app',
      markReactive: options.markReactive,
      beanClass: target as unknown as Constructable,
    });
  };
}
