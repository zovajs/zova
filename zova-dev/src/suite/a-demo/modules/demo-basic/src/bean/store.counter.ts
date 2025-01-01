import { Store } from 'zova';
import { BeanPiniaStoreBase, PiniaStore } from 'zova-module-a-pinia';
import { useCounterStore } from './counterStore.js';

export interface StoreCounter extends PiniaStore<typeof useCounterStore> {}

@Store()
export class StoreCounter extends BeanPiniaStoreBase {
  protected async __init__() {
    await super.__init__(useCounterStore);
  }
}
