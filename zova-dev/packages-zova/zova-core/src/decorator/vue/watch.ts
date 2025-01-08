import { WatchOptions } from 'vue';
import { appMetadata, MetadataKey } from '../../core/metadata.js';
import { DecoratorVue, IDecoratorVueOptions } from './types.js';

export function Watch(path?: string, watchOptions?: WatchOptions): MethodDecorator {
  return function (target: object, prop: MetadataKey, descriptor: PropertyDescriptor) {
    const vues = appMetadata.getOwnMetadataMap<MetadataKey, IDecoratorVueOptions>(DecoratorVue, target);
    vues[prop] = {
      type: 'watch',
      descriptor,
      options: {
        path,
        watchOptions,
      },
    };
  };
}
