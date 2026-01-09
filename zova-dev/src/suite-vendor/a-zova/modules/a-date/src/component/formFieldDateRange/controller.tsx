import { BeanControllerBase} from 'zova';
import { Controller } from 'zova-module-a-bean';
import { IFormFieldOptions, ZFormField } from 'zova-module-a-form';
import { ZDateRange } from '../../.metadata/index.js';

export interface ControllerFormFieldDateRangeProps extends IFormFieldOptions {
  separator?: string;
}

@Controller()
export class ControllerFormFieldDateRange extends BeanControllerBase {
  static $propsDefault = {};

  cContainer: string;

  protected async __init__() {
    this.cContainer = this.$style({ width: 'auto' });
  }

  protected render() {
    return (
      <ZFormField
        {...this.$props}
        classContainer={this.cContainer}
        slotDefault={({ options }, $$formField) => {
          return (
            <ZDateRange
              modelValue={options.displayValue}
              onUpdate:modelValue={value => {
                $$formField.handleDisplayValueUpdate(value, this.$props.onDisplayValueUpdate);
              }}
            ></ZDateRange>
          );
        }}
      ></ZFormField>
    );
  }
}
