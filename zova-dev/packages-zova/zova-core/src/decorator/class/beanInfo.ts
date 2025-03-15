import type { IDecoratorBeanInfoOptions } from '../interface/beanOptions.js';
import { appMetadata } from '../../core/metadata.js';
import { SymbolDecoratorBeanInfo } from '../../core/resource.js';

export function BeanInfo(options: IDecoratorBeanInfoOptions): ClassDecorator {
  return function (target) {
    // set metadata
    appMetadata.defineMetadata(SymbolDecoratorBeanInfo, options, target);
  };
}
