import type { IComponentOptions } from 'zova';
import type { IResourceFormFieldOptionsBase } from 'zova-module-a-openapi';

import { BeanControllerBase } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { ZFormField, type IFormFieldComponentOptions } from 'zova-module-a-form';

import { TypeDateFormatPreset } from '../../types/date.js';

declare module 'zova-module-a-openapi' {
  export interface IResourceComponentFormFieldRecord {
    'basic-date:formFieldDate'?: IResourceFormFieldDateOptions;
  }
}

export interface IResourceFormFieldDateOptions extends IResourceFormFieldOptionsBase {
  preset?: TypeDateFormatPreset;
  format?: string;
}

export interface ControllerFormFieldDateProps extends IFormFieldComponentOptions {
  options?: IResourceFormFieldDateOptions;
}

@Controller()
export class ControllerFormFieldDate extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false, deepExtendDefault: true };

  protected async __init__() {}

  protected render() {
    return <ZFormField {...this.$props}></ZFormField>;
  }
}
