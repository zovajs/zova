import { BeanControllerBase, ModelValue } from 'zova';
import { Controller } from 'zova-module-a-bean';

export interface ControllerDateRangeProps {}

export interface ControllerDateRangeModels {
  vModel?: number;
}

@Controller()
export class ControllerDateRange extends BeanControllerBase {
  static $propsDefault = {
    modelValue: 0,
  };

  @ModelValue()
  modelValue: number;

  protected async __init__() {}

  protected render() {
    return null;
  }
}
