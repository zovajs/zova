import { BeanPiniaStoreBase, PiniaStore } from 'zova-module-a-pinia';
import { useCounterStore } from './counterStore.js';
import { Store } from 'zova-module-a-bean';

export interface StoreCounter extends PiniaStore<typeof useCounterStore> {}

@Store()
export class StoreCounter extends BeanPiniaStoreBase {
  protected async __init__() {
    await super.__init__(useCounterStore);
  }
}
