import { appResource } from '../../core/resource.js';
import { Constructable, IDecoratorScopeOptions } from '../index.js';

export function Scope(options?: IDecoratorScopeOptions): ClassDecorator {
  return function (target) {
    if (!options) options = {};
    // add
    appResource.addBean({
      scene: 'scope',
      name: 'module', // force to the same name
      containerScope: 'app',
      markReactive: false,
      beanClass: target as unknown as Constructable,
    });
  };
}
