import type { BehaviorForm } from '../../bean/behavior.form.jsx';
import { BeanControllerBase, ISlot, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';

export interface ControllerFormSubscribeProps {
  slotDefault?: ISlot;
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
