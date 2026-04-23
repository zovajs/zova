import type { IComponentOptions } from 'zova';
import type { IFormFieldOptions } from 'zova-module-a-form';

import { BeanControllerBase } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ZFormField } from 'zova-module-a-form';
import { TypeDateFormat } from 'zova-module-a-openapi';

import { dateFormatUtil } from '../../lib/utils.js';

export interface ControllerFormFieldDateProps extends IFormFieldOptions {
  dateFormat?: TypeDateFormat;
}

@Controller()
export class ControllerFormFieldDate extends BeanControllerBase {
  static $propsDefault = {
    dateFormat: { preset: 'DATETIME_SHORT' },
  };
  static $componentOptions: IComponentOptions = { inheritAttrs: false };

  protected async __init__() {}

  protected render() {
    const displayValue = dateFormatUtil(this.$props.displayValue, this.$props.dateFormat);
    return <ZFormField {...this.$props} render="text" displayValue={displayValue}></ZFormField>;
  }
}
