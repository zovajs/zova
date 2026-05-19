import type { IComponentOptions } from 'zova';
import type { IResourceFormFieldOptionsBase } from 'zova-module-a-openapi';

import { isNil } from '@cabloy/utils';
import { classes } from 'typestyle';
import { VNode } from 'vue';
import { BeanControllerBase } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ZFormField, ZFormFieldPreset, type IFormFieldComponentOptions } from 'zova-module-a-form';

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
    if (this.$props.readonly) {
      return (
        <ZFormFieldPreset
          {...this.$props}
          render={'basic-input:formFieldInput'}
          options={{ value: this._getValueByItems() }}
        ></ZFormFieldPreset>
      );
    }
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
              const value = item[propsNew.itemValue!];
              domOptions.push(
                <option
                  key={value}
                  value={value}
                  selected={String(propsNew.value) === String(value)}
                >
                  {title}
                </option>,
              );
            }
          }
          return (
            <select
              class={propsNew.class}
              onChange={(e: Event) => {
                const selectedValue = (e.target as HTMLSelectElement).value;
                const item = propsNew.items?.find(
                  (it: any) => String(it[propsNew.itemValue!]) === selectedValue,
                );
                const value = item ? item[propsNew.itemValue!] : undefined;
                propsNew.onChange!(value);
              }}
            >
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

  private _getValueByItems() {
    const value = this.$props.value;
    const item = this.$props.options.items?.find(
      item => String(item[String(this.$props.options.itemValue)]) === String(value),
    );
    return item?.[String(this.$props.options.itemTitle)];
  }
}
