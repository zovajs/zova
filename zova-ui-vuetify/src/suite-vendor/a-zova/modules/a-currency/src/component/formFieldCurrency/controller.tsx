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

  private _valueKeyboardInput: string | undefined;

  protected async __init__() {}

  protected render() {
    const currencyOptions = this.$props.currency;
    const displayValue = this._displayValuePatch(currencyOptions);
    return (
      <ZFormField
        {...this.$props}
        render="text"
        displayValue={displayValue}
        displayValueUpdateTiming="input"
        onSetDisplayValue={value => {
          this._valueKeyboardInput = value;
          const valuePatch = currencyUpdate(value, currencyOptions);
          return valuePatch !== undefined ? valuePatch : value;
        }}
      ></ZFormField>
    );
  }

  private _displayValuePatch(currencyOptions?: CurrencyOptions) {
    if (this._valueKeyboardInput === undefined) return this._getDisplayValue(currencyOptions);
    // hold the current input value if invalid
    const valueInputPatch = currencyUpdate(this._valueKeyboardInput, currencyOptions);
    if (valueInputPatch === undefined) return this._valueKeyboardInput;
    // hold the current input value if equal
    if (valueInputPatch === this.$props.displayValue) return this._valueKeyboardInput;
    // default
    return this._getDisplayValue(currencyOptions);
  }

  private _getDisplayValue(currencyOptions?: CurrencyOptions) {
    return currencyFormat(this.$props.displayValue, currencyOptions);
  }
}
