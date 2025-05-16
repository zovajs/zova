import { BeanControllerBase } from 'zova';
import { Controller } from 'zova-module-a-bean';

export interface ControllerFormFieldProps {}

@Controller()
export class ControllerFormField extends BeanControllerBase {
  static $propsDefault = {};

  protected async __init__() {}
}
