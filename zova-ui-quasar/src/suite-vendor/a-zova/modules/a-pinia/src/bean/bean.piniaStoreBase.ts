import { BeanBase, Virtual } from 'zova';
import { Bean } from 'zova-module-a-bean';

const SymbolPiniaStore = Symbol('SymbolPiniaStore');

@Bean()
@Virtual()
export class BeanPiniaStoreBase extends BeanBase {
  [SymbolPiniaStore];

  protected __get__(prop: string) {
    return this[SymbolPiniaStore][prop];
  }

  protected __set__(prop: string, value: any): boolean {
    if (prop in this[SymbolPiniaStore]) {
      this[SymbolPiniaStore][prop] = value;
      return true;
    } else {
      return false;
    }
  }

  protected async __init__(useStore) {
    this[SymbolPiniaStore] = useStore();
  }
}
