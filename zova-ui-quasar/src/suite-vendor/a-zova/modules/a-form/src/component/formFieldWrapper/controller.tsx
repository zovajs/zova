import type { ControllerForm } from '../form/controller.jsx';
import { BeanControllerBase, IComponentOptions, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { IFormFieldOptions } from '../../types/formField.js';

export interface ControllerFormFieldWrapperProps<TParentData extends {} = {}> extends IFormFieldOptions<TParentData> {}

@Controller()
export class ControllerFormFieldWrapper<TParentData extends {} = {}> extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false };

  @Use({ injectionScope: 'host' })
  $$form: ControllerForm<TParentData>;

  protected async __init__() {}

  protected render() {
    return this.$$form.renderField(this.$props.name);
  }
}
