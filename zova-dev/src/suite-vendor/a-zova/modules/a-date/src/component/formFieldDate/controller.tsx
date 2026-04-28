import type { IComponentOptions } from 'zova';
import type { IFormFieldPresetOptions } from 'zova-module-a-form';

import { BeanControllerBase } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ZFormFieldPreset } from 'zova-module-a-form';
import { IDateOptions } from 'zova-module-basic-openapi';

import { dateFormatUtil } from '../../lib/utils.js';

export interface ControllerFormFieldDateProps extends IFormFieldPresetOptions {}

@Controller()
export class ControllerFormFieldDate extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false };

  protected async __init__() {}

  protected render() {
    const value = dateFormatUtil(this.$props.value, this.dateFormat);
    return <ZFormFieldPreset {...this.$props} render="input" preset={{ input: { value } }}></ZFormFieldPreset>;
  }

  get dateFormat(): IDateOptions {
    const date = this.$props.preset?.date;
    return { preset: 'DATETIME_SHORT', ...date };
  }
}
