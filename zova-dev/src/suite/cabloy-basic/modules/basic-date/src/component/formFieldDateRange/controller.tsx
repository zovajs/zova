import type { IComponentOptions } from 'zova';
import type { IFormFieldPresetOptions } from 'zova-module-a-form';

import { BeanControllerBase } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ZFormField } from 'zova-module-a-form';

import { ZDateRange } from '../../.metadata/index.js';

export interface ControllerFormFieldDateRangeProps extends IFormFieldPresetOptions {}

@Controller()
export class ControllerFormFieldDateRange extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false, deepExtendDefault: true };

  cContainer: string;

  protected async __init__() {
    this.cContainer = this.$style({ width: 'auto' });
  }

  protected render() {
    return (
      <ZFormField
        {...this.$props}
        layout={{ class: this.cContainer }}
        slotDefault={({ propsBucket }, $$formField) => {
          return (
            <ZDateRange
              separator={this.$props.preset?.DateRange?.separator}
              modelValue={propsBucket.value}
              onUpdate:modelValue={value => {
                $$formField.setValue(value);
              }}
            ></ZDateRange>
          );
        }}
      ></ZFormField>
    );
  }
}
