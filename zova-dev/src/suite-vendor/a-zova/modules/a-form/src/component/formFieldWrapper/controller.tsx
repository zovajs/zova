import { BeanControllerBase, IComponentOptions, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';

import type { ControllerForm } from '../form/controller.jsx';

import { IFormFieldPresetOptions } from '../../types/formField.js';

export interface ControllerFormFieldWrapperProps<TParentData extends {} = {}> extends IFormFieldPresetOptions<TParentData> {}

@Controller()
export class ControllerFormFieldWrapper<TParentData extends {} = {}> extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false };

  @Use({ injectionScope: 'host' })
  $$form: ControllerForm<TParentData>;

  protected async __init__() {}

  protected render() {
    const name = this.$props.name;
    if (!name) throw new Error(`should specify field name`);
    return this.$$form.renderField(name, this.$props as any);
  }
}
