import { VNode } from 'vue';
import { BeanControllerBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';

import type { ControllerForm } from '../form/controller.jsx';

export interface ControllerFormSubscribeProps<TFormData extends {} = {}, TSubmitMeta = never> {
  slotDefault?: (form: ControllerForm<TFormData, TSubmitMeta>) => VNode;
}

@Controller()
export class ControllerFormSubscribe extends BeanControllerBase {
  static $propsDefault = {};

  @Use({ injectionScope: 'host' })
  $$form: ControllerForm;

  protected render() {
    return this.$slotDefault?.(this.$$form);
  }
}
