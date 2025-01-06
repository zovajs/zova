import { BeanControllerPageBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { StoreCounter } from '../../bean/store.counter.js';
import { ZPage } from 'zova-module-home-base';

@Controller()
export class ControllerPagePinia extends BeanControllerPageBase {
  @Use()
  $$counter: StoreCounter;

  protected async __init__() {}

  protected render() {
    return (
      <ZPage>
        <div>{`count: ${this.$$counter.count}`}</div>
        <div>{`doubleCount: ${this.$$counter.doubleCount}`}</div>
        <div>{`name: ${this.$$counter.name}`}</div>
        <button
          class="btn btn-primary"
          onClick={() => {
            this.$$counter.increment();
          }}
        >
          Increment
        </button>
      </ZPage>
    );
  }
}
