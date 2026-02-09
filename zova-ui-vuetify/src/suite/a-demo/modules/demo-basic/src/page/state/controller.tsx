import { VBtn } from 'vuetify/components/VBtn';
import { BeanControllerPageBase, useComputed } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ZPage } from 'zova-module-home-base';

@Controller()
export class ControllerPageState extends BeanControllerPageBase {
  count: number = 0;
  count2: string;

  protected async __init__() {
    this.count2 = useComputed(() => {
      return `=== ${this.count} ===`;
    });
  }

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

  protected render() {
    return (
      <ZPage>
        <div>{`count(ref): ${this.count}`}</div>
        <div>{`count(computed): ${this.count2}`}</div>
        <VBtn color="secondary" nativeOnClick={() => this.increment()}>
          Increment
        </VBtn>
        <VBtn color="secondary" nativeOnClick={() => this.decrement()}>
          Decrement
        </VBtn>
      </ZPage>
    );
  }
}
