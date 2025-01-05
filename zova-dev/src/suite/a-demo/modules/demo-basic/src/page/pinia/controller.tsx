import { BeanControllerPageBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { StoreCounter } from '../../bean/store.counter.js';

@Controller()
export class ControllerPagePinia extends BeanControllerPageBase {
  @Use()
  $$counter: StoreCounter;

  protected async __init__() {}
}
