import { BeanControllerPageBase } from 'zova';
import { Controller } from 'zova-module-a-bean';

@Controller()
export class ControllerPageToolOne extends BeanControllerPageBase {
  protected async __init__() {}

  protected render() {
    return <div>tool one</div>;
  }
}
