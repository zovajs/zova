import type { IComponentOptions } from 'zova';
import type { IFormFieldOptions } from 'zova-module-a-form';
import { BeanControllerBase } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ZFormField } from 'zova-module-a-form';
import { ZDateRange } from '../../.metadata/index.js';

export interface ControllerFormFieldDateRangeProps extends IFormFieldOptions {
  separator?: string;
}

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
        slotDefault={({ propsBucket }, $$formField) => {
          return (
            <ZDateRange
              separator={this.$props.separator}
              modelValue={propsBucket.displayValue}
              onUpdate:modelValue={value => {
                $$formField.setDisplayValue(value);
              }}
            ></ZDateRange>
          );
        }}
      ></ZFormField>
    );
  }
}
