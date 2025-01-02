import { BeanControllerPageBase, useComputed } from 'zova';
import { Local } from 'zova-module-a-bean';

@Local()
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
}
