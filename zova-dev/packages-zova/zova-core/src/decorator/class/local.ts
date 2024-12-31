import { appResource } from '../../core/resource.js';
import { IDecoratorLocalOptions } from '../interface/beanOptions.js';
import { Constructable } from '../type/constructable.js';

export function Local(options?: IDecoratorLocalOptions): ClassDecorator {
  return function (target) {
    if (!options) options = {};
    // add
    appResource.addBean({
      scene: 'local',
      containerScope: options.containerScope,
      markReactive: options.markReactive,
      beanClass: target as unknown as Constructable,
    });
  };
}
