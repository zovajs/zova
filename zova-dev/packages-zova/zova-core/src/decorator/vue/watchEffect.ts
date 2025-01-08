import { WatchEffectOptions } from 'vue';
import { appMetadata, MetadataKey } from '../../core/metadata.js';
import { DecoratorVueElements, IDecoratorVueElement } from './types.js';

export function WatchEffect(watchEffectOptions?: WatchEffectOptions): MethodDecorator {
  return function (target: object, prop: MetadataKey, descriptor: PropertyDescriptor) {
    const vues = appMetadata.getOwnMetadataMap<MetadataKey, IDecoratorVueElement[]>(DecoratorVueElements, target);
    if (!vues[prop]) vues[prop] = [];
    vues[prop].push({
      type: 'watchEffect',
      descriptor,
      options: {
        watchEffectOptions,
      },
    });
  };
}
