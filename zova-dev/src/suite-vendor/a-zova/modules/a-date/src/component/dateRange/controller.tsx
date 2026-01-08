import { BeanControllerBase, ModelValue } from 'zova';
import { Controller } from 'zova-module-a-bean';

export interface ControllerDateRangeProps {
  separator?: string;
}

export interface ControllerDateRangeModels {
  vModel?: string;
}

@Controller()
export class ControllerDateRange extends BeanControllerBase {
  static $propsDefault = {
    separator: '~',
  };

  private cSeparator: string;

  @ModelValue()
  modelValue: string;

  protected async __init__() {
    this.cSeparator = this.$style({
      width: '20px',
      display: 'inline-block',
      textAlign: 'center',
    });
  }

  protected render() {
    return (
      <div>
        <input style={{ width: '130px' }} type="date" />
        <div class={this.cSeparator}>~</div>
        <input style={{ width: '130px' }} type="date" />
      </div>
    );
  }
}
