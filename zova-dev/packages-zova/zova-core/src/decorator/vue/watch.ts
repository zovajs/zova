import { WatchOptions } from 'vue';
import { appMetadata, MetadataKey } from '../../core/metadata.js';
import { DecoratorVueElements, IDecoratorVueElement } from './types.js';

export function Watch(path?: string, watchOptions?: WatchOptions): MethodDecorator {
  return function (target: object, prop: MetadataKey, descriptor: PropertyDescriptor) {
    const vues = appMetadata.getOwnMetadataMap<MetadataKey, IDecoratorVueElement[]>(DecoratorVueElements, target);
    if (!vues[prop]) vues[prop] = [];
    vues[prop].push({
      type: 'watch',
      descriptor,
      options: {
        path,
        watchOptions,
      },
    });
  };
}
