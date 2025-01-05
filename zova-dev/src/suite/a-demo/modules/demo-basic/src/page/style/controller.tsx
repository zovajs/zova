import { BeanControllerPageBase } from 'zova';
import { Controller } from 'zova-module-a-bean';

@Controller()
export class ControllerPageStyle extends BeanControllerPageBase {
  active: boolean;

  protected async __init__() {}
}
