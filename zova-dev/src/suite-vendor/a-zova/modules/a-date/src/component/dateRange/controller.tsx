import { BeanControllerBase } from 'zova';
import { Controller } from 'zova-module-a-bean';

@Controller()
export class ControllerDateRange extends BeanControllerBase {
  static $propsDefault = {};

  protected async __init__() {}

  protected render() {
    return null;
  }
}
