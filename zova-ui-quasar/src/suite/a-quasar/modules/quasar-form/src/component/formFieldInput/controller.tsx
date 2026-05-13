import type { IComponentOptions } from 'zova';
import type { IResourceFormFieldOptionsBase } from 'zova-module-a-openapi';

import { QIcon, QInput, type QInputProps } from 'quasar';
import z from 'zod';
import { BeanControllerBase } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ZFormField, type IFormFieldComponentOptions } from 'zova-module-a-form';

declare module 'zova-module-a-openapi' {
  export interface IResourceFormFieldRecord {
    'quasar-form:formFieldInput'?: IResourceFormFieldInputOptions;
  }
}

export interface IResourceFormFieldInputOptions extends IResourceFormFieldOptionsBase, QInputProps {}

export interface ControllerFormFieldInputProps extends IFormFieldComponentOptions {
  options?: IResourceFormFieldInputOptions;
}

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
          const { field } = $$formField;
          const error = !field.state.meta.isValid;
          const errorObj = field.state.meta.errors[0] as z.ZodError | undefined;
          const propsNew: IResourceFormFieldInputOptions = {
            'type': 'text',
            'label': propsBucket.layout?.label,
            'modelValue': propsBucket.value,
            'onUpdate:modelValue': value => {
              $$formField.setValue(value);
            },
            'onBlur': () => {
              $$formField.handleBlur();
            },
            'noErrorIcon': true,
            error,
            'errorMessage': errorObj?.message,
            ...propsBucket.options,
            ...props,
          };
          // slots
          const slots: any = {};
          if (propsBucket.layout?.iconPrefix) {
            slots.prepend = () => <QIcon name={propsBucket.layout?.iconPrefix}></QIcon>;
          }
          if (propsBucket.layout?.iconSuffix) {
            slots.append = () => <QIcon name={propsBucket.layout?.iconSuffix}></QIcon>;
          }
          return <QInput {...propsNew} v-slots={slots}></QInput>;
        }}
      ></ZFormField>
    );
  }
}
