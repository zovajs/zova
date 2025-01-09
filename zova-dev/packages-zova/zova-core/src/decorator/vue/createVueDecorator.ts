import { appMetadata, MetadataKey } from '../../core/metadata.js';
import { DecoratorVueElements, IDecoratorVueElement, TypeDecoratorVue } from './types.js';

export function createVueDecorator<OPTIONS>(type: TypeDecoratorVue, options?: OPTIONS) {
  return function (target: object, prop: MetadataKey, descriptor: PropertyDescriptor) {
    const vues = appMetadata.getOwnMetadataMap<MetadataKey, IDecoratorVueElement<OPTIONS>[]>(
      DecoratorVueElements,
      target,
    );
    if (!vues[prop]) vues[prop] = [];
    vues[prop].push({
      type,
      descriptor,
      options,
    });
  };
}
