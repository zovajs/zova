import { BeanControllerBase, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { BehaviorForm } from '../../bean/behavior.form.jsx';
import { IFormBehaviors } from '../../types/behavior.js';
import { IFormFieldLayoutOptionsBase, IFormFieldOptions } from '../../types/formField.js';

export interface ControllerFormFieldProps<TParentData = unknown> extends IFormFieldOptions<TParentData>, IFormFieldLayoutOptionsBase {
  formBehaviors?: IFormBehaviors;
}

@Controller()
export class ControllerFormField extends BeanControllerBase {
  static $propsDefault = {};

  formBehaviors: IFormBehaviors;

  @Use({ injectionScope: 'host' })
  $$behaviorForm: BehaviorForm;

  protected async __init__() {
    this.formBehaviors = this.$useComputed(() => {
      return Object.assign({}, this.$$behaviorForm.formBehaviors, this.$props.formBehaviors);
    });
  }
}
