import { appResource } from '../../core/resource.js';
import { IDecoratorBeanOptions } from '../interface/beanOptions.js';
import { Constructable } from '../type/constructable.js';

export function Bean(options?: IDecoratorBeanOptions): ClassDecorator {
  return function (target) {
    if (!options) options = {};
    // add
    appResource.addBean({
      scene: options.scene || 'bean',
      name: options.name,
      containerScope: options.containerScope,
      markReactive: options.markReactive,
      beanClass: target as unknown as Constructable,
    });
  };
}
