import { BeanControllerBase, ModelValue } from 'zova';
import { Controller } from 'zova-module-a-bean';

export interface ControllerDateRangeProps {}

export interface ControllerDateRangeModels {
  vModel?: string;
}

@Controller()
export class ControllerDateRange extends BeanControllerBase {
  static $propsDefault = {};

  @ModelValue()
  modelValue: string;

  protected async __init__() {}

  protected render() {
    return (
      <div>
        <input type="date" class="input" />
        <span>~</span>
        <input type="date" class="input" />
      </div>
    );
  }
}
