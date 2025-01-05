import { BeanControllerPageBase } from 'zova';
import { Controller } from 'zova-module-a-bean';

@Controller()
export class ControllerPageLegacy extends BeanControllerPageBase {
  protected async __init__() {}
}
