import { appResource } from '../../core/resource.js';
import { IDecoratorVirtualOptions } from '../interface/beanOptions.js';
import { Constructable } from '../type/constructable.js';

export function Virtual(options?: IDecoratorVirtualOptions): ClassDecorator {
  return function (target) {
    if (!options) options = {};
    // add
    appResource.addBean({
      scene: options.scene || 'virtual',
      name: options.name,
      containerScope: options.containerScope,
      markReactive: options.markReactive,
      beanClass: target as unknown as Constructable,
      virtual: true,
    });
  };
}
