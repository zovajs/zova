import { BeanBase, Virtual } from 'zova';

const SymbolPiniaStore = Symbol('SymbolPiniaStore');

@Virtual()
export class BeanPiniaStoreBase extends BeanBase {
  [SymbolPiniaStore];

  protected __get__(prop) {
    return this[SymbolPiniaStore][prop];
  }

  protected __set__(prop, value) {
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
