import type { IComponentOptions } from 'zova';
import type { IResourceFormFieldOptionsBase } from 'zova-module-a-openapi';

import { isNil } from '@cabloy/utils';
import { classes } from 'typestyle';
import { VNode } from 'vue';
import { BeanControllerBase } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ZFormField, type IFormFieldComponentOptions } from 'zova-module-a-form';

declare module 'zova-module-a-openapi' {
  export interface IResourceFormFieldRecord {
    'basic-select:formFieldSelect'?: IResourceFormFieldSelectOptions;
  }
}

export interface IResourceFormFieldSelectOptions extends IResourceFormFieldOptionsBase {
  value?: any;
  onChange?: (value: any) => void;
  placeholder?: string;
  items?: any[] | undefined;
  itemTitle?: string;
  itemValue?: string;
}

export interface ControllerFormFieldSelectProps extends IFormFieldComponentOptions {
  options?: IResourceFormFieldSelectOptions;
}

@Controller()
export class ControllerFormFieldSelect extends BeanControllerBase {
  static $propsDefault = {
    options: {
      itemValue: 'value',
      itemTitle: 'title',
    },
  };
  static $componentOptions: IComponentOptions = { inheritAttrs: false, deepExtendDefault: true };

  protected async __init__() {}

  protected render() {
    return (
      <ZFormField
        {...this.$props}
        slotDefault={({ propsBucket, props }, $$formField) => {
          const className = !propsBucket.needHandleBorder
            ? classes(props.class, 'select select-ghost')
            : classes(
                props.class,
                'select',
                !$$formField.field.state.meta.isValid && 'select-error',
              );
          const propsNew: Omit<IResourceFormFieldSelectOptions, 'style'> = {
            onChange: (value: any) => {
              $$formField.setValue(value, propsBucket.disableNotifyChanged);
            },
            value: propsBucket.value,
            ...propsBucket.options,
            ...props,
            class: className,
          };
          const domOptions: VNode[] = [];
          if (propsNew.items) {
            for (const item of propsNew.items) {
              const title = item[propsNew.itemTitle!];
              const value = item[propsNew.value!];
              domOptions.push(
                <option key={value} selected={propsNew.value === value}>
                  {title}
                </option>,
              );
            }
          }
          return (
            <select class={propsNew.class}>
              {!!propsNew.placeholder && (
                <option disabled={true} selected={isNil(propsNew.value)}>
                  {propsNew.placeholder}
                </option>
              )}
              {domOptions}
            </select>
          );
        }}
      ></ZFormField>
    );
  }
}
