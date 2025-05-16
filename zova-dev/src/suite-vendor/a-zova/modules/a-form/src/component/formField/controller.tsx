import { BeanControllerBase } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { IFormFieldLayoutOptionsBase, IFormFieldOptions } from '../../types/formField.js';

export interface ControllerFormFieldProps<TParentData = unknown> extends IFormFieldOptions<TParentData>, IFormFieldLayoutOptionsBase {}

@Controller()
export class ControllerFormField extends BeanControllerBase {
  static $propsDefault = {};

  protected async __init__() {}
}
