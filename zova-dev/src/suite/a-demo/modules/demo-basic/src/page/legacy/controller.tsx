import { BeanControllerPageBase } from 'zova';
import { Local } from 'zova-module-a-bean';

@Local()
export class ControllerPageLegacy extends BeanControllerPageBase {
  protected async __init__() {}
}
