import { appMetadata } from '../../core/sys/metadata.js';
import { SymbolDecoratorPreload } from '../../core/sys/resource.js';

export function Preload(): ClassDecorator {
  return function (target) {
    // set metadata
    appMetadata.defineMetadata(SymbolDecoratorPreload, true, target);
  };
}
