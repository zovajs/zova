import type { ControllerForm } from 'zova-module-a-form';
import { CurrencyOptions } from '@zhennann/currency';
import { BeanControllerBase, IComponentOptions, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { IFormFieldOptions, ZFormField } from 'zova-module-a-form';
import { currencyFormat, currencyUpdate } from '../../lib/utils.js';

export interface ControllerFormFieldCurrencyProps extends IFormFieldOptions {
  currency?: CurrencyOptions;
}

@Controller()
export class ControllerFormFieldCurrency extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false };

  @Use({ injectionScope: 'host' })
  $$form: ControllerForm;

  protected async __init__() {}

  protected render() {
    const name = this.$props.name;
    let displayValue = this.$$form.getFieldDisplayValue(name, this.$props.displayValue);
    displayValue = currencyFormat(displayValue, this.$props.currency);
    return (
      <ZFormField
        {...this.$props}
        render="text"
        displayValue={displayValue}
        onChange={(e: Event) => {
          const value = currencyUpdate((e.target as HTMLInputElement).value, this.$props.currency);
          if (value !== undefined) {
            this.$$form.handleFieldDisplayValueUpdate(name, value, this.$props.onDisplayValueUpdate);
          }
        }}
        onInput={null}
      ></ZFormField>
    );
  }
}
