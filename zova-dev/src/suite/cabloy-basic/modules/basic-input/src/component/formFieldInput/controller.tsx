import type { IComponentOptions } from 'zova';

import { BeanControllerBase } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { IFormFieldPresetOptions, ZFormField } from 'zova-module-a-form';

export interface ControllerFormFieldInputProps extends IFormFieldPresetOptions {}

@Controller()
export class ControllerFormFieldInput extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false };

  protected async __init__() {}

  protected render() {
    return (
      <ZFormField
        {...this.$props}
        slotDefault={({ propsBucket }) => {
          console.log(propsBucket);
          return <div>Hello</div>;
        }}
      ></ZFormField>
    );
  }
}
