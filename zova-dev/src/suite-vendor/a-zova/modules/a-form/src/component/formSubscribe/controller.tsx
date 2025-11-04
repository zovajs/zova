import type { BehaviorForm } from '../../bean/behavior.form.jsx';
import { VNode } from 'vue';
import { BeanControllerBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { TypeForm, TypeFormState } from '../../types/form.js';

export interface ControllerFormSubscribeProps<T extends {} = {}> {
  slotDefault?: (formState: TypeFormState<T>, form: TypeForm<T>) => VNode;
}

@Controller()
export class ControllerFormSubscribe extends BeanControllerBase {
  static $propsDefault = {};

  @Use({ injectionScope: 'host' })
  $$behaviorForm: BehaviorForm;

  protected render() {
    return this.$slots.default?.(this.$$behaviorForm.formState, this.$$behaviorForm.form);
  }
}
