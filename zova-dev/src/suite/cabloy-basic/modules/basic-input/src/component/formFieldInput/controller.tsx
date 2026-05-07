import type { IComponentOptions } from 'zova';

import { classes } from 'typestyle';
import { BeanControllerBase } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { IFormFieldPresetOptionsBase, ZFormField } from 'zova-module-a-form';
import { IResourceFormFieldOptionsInput } from 'zova-module-basic-openapi';

export interface ControllerFormFieldInputProps extends IFormFieldPresetOptionsBase<IResourceFormFieldOptionsInput> {}

@Controller()
export class ControllerFormFieldInput extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false, deepExtendDefault: true };

  protected async __init__() {}

  protected render() {
    return (
      <ZFormField
        {...this.$props}
        slotDefault={({ propsBucket, props }, $$formField) => {
          const className = !propsBucket.needHandleBorder
            ? props.class
            : classes(props.class, 'input', propsBucket.layout?.bordered && 'input-bordered', !$$formField.field.state.meta.isValid && 'input-error');
          const propsNew: Omit<IResourceFormFieldOptionsInput, 'style'> = {
            type: 'text',
            placeholder: undefined,
            onInput: (e: Event) => {
              $$formField.setValue((e.target as HTMLInputElement).value, propsBucket.disableNotifyChanged);
            },
            onBlur: () => {
              $$formField.handleBlur();
            },
            value: propsBucket.value,
            ...propsBucket.options,
            ...props,
            class: className,
          };
          return <input {...propsNew}></input>;
        }}
      ></ZFormField>
    );
  }
}
