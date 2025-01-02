import { appResource } from '../../core/resource.js';
import { IBeanSceneRecord } from '../interface/beanOptions.js';
import { Constructable } from '../type/constructable.js';
import { ContainerScope } from '../type/containerScope.js';

export function createBeanDecorator<T>(
  scene: keyof IBeanSceneRecord,
  containerScope?: ContainerScope,
  markReactive?: boolean,
  options?: T,
  optionsPrimitive?: boolean,
  virtual?: boolean,
  fn?: (target: Constructable) => void,
): ClassDecorator {
  return function (target) {
    // name
    const name = scene === 'scope' ? 'module' : undefined;
    // add
    appResource.addBean({
      scene,
      name,
      containerScope,
      markReactive,
      beanClass: target as unknown as Constructable,
      options,
      optionsPrimitive,
      virtual,
    });
    // fn
    fn && fn(target as unknown as Constructable);
  };
}
