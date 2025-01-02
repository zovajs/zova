import { BeanControllerPageBase } from 'zova';
import { Local } from 'zova-module-a-bean';

@Local()
export class ControllerPageIndex extends BeanControllerPageBase {
  protected async __init__() {}
}
