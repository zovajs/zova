import { BeanControllerBase, IComponentOptions } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { IFormFieldOptions, ZFormField } from 'zova-module-a-form';
import { ZDateRange } from '../../.metadata/index.js';

export interface ControllerFormFieldDateRangeProps extends IFormFieldOptions {}

@Controller()
export class ControllerFormFieldDateRange extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false };

  cContainer: string;

  protected async __init__() {
    this.cContainer = this.$style({ width: 'auto' });
  }

  protected render() {
    return (
      <ZFormField
        {...this.$props}
        classContainer={this.cContainer}
      >
        <ZDateRange></ZDateRange>
      </ZFormField>
    );
  }
}
