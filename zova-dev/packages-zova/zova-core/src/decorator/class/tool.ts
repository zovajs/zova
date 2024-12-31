import { appResource } from '../../core/resource.js';
import { Constructable, IDecoratorToolOptions } from '../index.js';

export function Tool(options?: IDecoratorToolOptions): ClassDecorator {
  return function (target) {
    if (!options) options = {};
    // add
    appResource.addBean({
      scene: options.scene || 'tool',
      name: options.name,
      containerScope: 'app',
      markReactive: options.markReactive,
      beanClass: target as unknown as Constructable,
    });
  };
}
