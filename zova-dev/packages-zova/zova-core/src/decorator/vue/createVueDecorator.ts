import type { MetadataKey } from '../../core/metadata.js';
import type { IDecoratorVueElement, TypeDecoratorVue } from './types.js';
import { appMetadata } from '../../core/metadata.js';
import { DecoratorVueElements } from './types.js';

export function createVueDecorator<OPTIONS>(
  type: TypeDecoratorVue,
  options?: OPTIONS,
): PropertyDecorator & MethodDecorator {
  return function (target: object, prop: MetadataKey, descriptor?: PropertyDescriptor) {
    const vues = appMetadata.getOwnMetadataMap<MetadataKey, IDecoratorVueElement<OPTIONS>[]>(
      DecoratorVueElements,
      target,
    );
    if (!vues[prop]) vues[prop] = [];
    vues[prop].push({
      type,
      descriptor: descriptor!,
      options,
    });
  };
}
