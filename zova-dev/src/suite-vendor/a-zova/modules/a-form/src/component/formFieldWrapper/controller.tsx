import { VNode } from 'vue';
import { BeanControllerBase, IComponentOptions, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';

import type { ControllerForm } from '../form/controller.jsx';

export interface ControllerFormFieldWrapperProps<TParentData extends {} = {}, TSubmitMeta = never> {
  name?: string;
  slotDefault?: (form: ControllerForm<TParentData, TSubmitMeta>) => VNode;
}

@Controller()
export class ControllerFormFieldWrapper extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false };

  @Use({ injectionScope: 'host' })
  $$form: ControllerForm;

  protected async __init__() {}

  protected render() {
    if (this.$slotDefault) {
      return this.$slotDefault(this.$$form);
    }
    const name = this.$props.name;
    if (!name) throw new Error(`should specify field name`);
    return this.$$form.renderField(name);
  }
}
