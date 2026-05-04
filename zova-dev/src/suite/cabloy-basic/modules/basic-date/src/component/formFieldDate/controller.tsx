import type { IComponentOptions } from 'zova';
import type { IFormFieldPresetOptions } from 'zova-module-a-form';

import { BeanControllerBase } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ZFormFieldPreset } from 'zova-module-a-form';
import { IResourceFormFieldOptionsDate } from 'zova-module-basic-openapi';

import { dateFormatUtil } from '../../lib/utils.js';

export interface ControllerFormFieldDateProps extends IFormFieldPresetOptions {}

@Controller()
export class ControllerFormFieldDate extends BeanControllerBase {
  static $propsDefault = {
    preset: {
      Date: { preset: 'DATETIME_SHORT' },
    },
  };
  static $componentOptions: IComponentOptions = { inheritAttrs: false, deepExtendDefault: true };

  protected async __init__() {}

  protected render() {
    const value = dateFormatUtil(this.$props.value, this.dateFormat);
    return <ZFormFieldPreset {...this.$props} render="Input" preset={{ Input: { value } }}></ZFormFieldPreset>;
  }

  get dateFormat(): IResourceFormFieldOptionsDate | undefined {
    return this.$props.preset?.Date;
  }
}
