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
        <input style={{ width: '130px' }} type="date" />
        <span>~</span>
        <input style={{ width: '130px' }} type="date" />
      </div>
    );
  }
}
