import { appMetadata, MetadataKey } from '../../core/metadata.js';
import { DecoratorVue, IDecoratorVueOptions } from './types.js';

export function Emit(eventName?: string): MethodDecorator {
  return function (target: object, prop: MetadataKey, descriptor: PropertyDescriptor) {
    const vues = appMetadata.getOwnMetadataMap<MetadataKey, IDecoratorVueOptions>(DecoratorVue, target);
    vues[prop] = {
      type: 'emit',
      descriptor,
      options: eventName,
    };
  };
}
