import { appMetadata } from '../../core/sys/metadata.js';
import { SymbolDecoratorVirtual } from '../../core/sys/resource.js';

export function Virtual(): ClassDecorator {
  return function (target) {
    // set metadata
    appMetadata.defineMetadata(SymbolDecoratorVirtual, true, target);
  };
}
