import { QBtn } from 'quasar';
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
        <QBtn color="secondary" onClick={() => this.increment()}>
          Increment
        </QBtn>
        <QBtn color="secondary" onClick={() => this.decrement()}>
          Decrement
        </QBtn>
      </ZPage>
    );
  }
}
