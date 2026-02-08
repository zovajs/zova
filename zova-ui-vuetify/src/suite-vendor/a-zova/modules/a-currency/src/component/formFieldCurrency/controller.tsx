import { CurrencyOptions } from '@zhennann/currency';
import { BeanControllerBase, IComponentOptions } from 'zova';
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

  protected async __init__() {}

  protected render() {
    const currencyOptions = this.$props.currency;
    const displayValue = currencyFormat(this.$props.displayValue, currencyOptions);
    return (
      <ZFormField
        {...this.$props}
        render="text"
        displayValue={displayValue}
        displayValueUpdateTiming="change"
        onSetDisplayValue={value => {
          const valuePatch = currencyUpdate(value, currencyOptions);
          return valuePatch !== undefined ? valuePatch : value;
        }}
      ></ZFormField>
    );
  }
}
