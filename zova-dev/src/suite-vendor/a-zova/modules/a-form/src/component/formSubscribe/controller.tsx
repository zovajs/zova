import type { ControllerForm } from '../form/controller.jsx';
import { VNode } from 'vue';
import { BeanControllerBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { TypeForm, TypeFormState } from '../../types/form.js';

export interface ControllerFormSubscribeProps<TFormData extends {} = {}, TSubmitMeta = never> {
  slotDefault?: (formState: TypeFormState<TFormData>, form: TypeForm<TFormData, TSubmitMeta>) => VNode;
}

@Controller()
export class ControllerFormSubscribe extends BeanControllerBase {
  static $propsDefault = {};

  @Use({ injectionScope: 'host' })
  $$form: ControllerForm;

  protected render() {
    return this.$slotDefault?.(this.$$form.formState, this.$$form.form);
  }
}
