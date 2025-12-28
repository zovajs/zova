import type { ControllerForm } from 'zova-module-a-form';
import { Currency, CurrencyOptions } from '@zhennann/currency';
import { BeanControllerBase, IComponentOptions, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { IFormFieldOptions, ZFormField } from 'zova-module-a-form';

export interface ControllerFormFieldCurrencyProps extends IFormFieldOptions, CurrencyOptions {}

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
    displayValue=this._serializer(displayValue);
    return (
      <ZFormField
        name={name}
        displayValue={displayValue}
        render="text"
      ></ZFormField>
    );
  }

  private _serializer(value:any){
    if (!value || (typeof value !== 'number' && typeof value !== 'string')) return value;
    const currency = new Currency(this.$props);
    return currency.format(value);
  }
}
