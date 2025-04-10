import { appMetadata } from '../../core/sys/metadata.js';
import { SymbolDecoratorProxyDisable } from '../../core/resource.js';

export function ProxyDisable(): ClassDecorator {
  return function (target) {
    // set metadata
    appMetadata.defineMetadata(SymbolDecoratorProxyDisable, true, target);
  };
}
