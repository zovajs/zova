import { BeanControllerPageBase } from 'zova';
import { Local } from 'zova-module-a-bean';

@Local()
export class ControllerPageErrorNotFound extends BeanControllerPageBase {
  protected async __init__() {}
}
