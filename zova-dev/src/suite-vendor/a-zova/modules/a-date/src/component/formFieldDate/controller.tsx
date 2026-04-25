import type { IComponentOptions } from 'zova';
import type { IFormFieldOptions } from 'zova-module-a-form';

import { BeanControllerBase } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ZFormField } from 'zova-module-a-form';
import { IDateOptions } from 'zova-module-basic-openapi';

import { dateFormatUtil } from '../../lib/utils.js';

export interface ControllerFormFieldDateProps extends IFormFieldOptions {}

@Controller()
export class ControllerFormFieldDate extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false };

  protected async __init__() {}

  protected render() {
    const displayValue = dateFormatUtil(this.$props.displayValue, this.dateFormat);
    return <ZFormField {...this.$props} render="text" displayValue={displayValue}></ZFormField>;
  }

  get dateFormat(): IDateOptions {
    const date = this.$props.preset?.date;
    return { preset: 'DATETIME_SHORT', ...date };
  }
}
