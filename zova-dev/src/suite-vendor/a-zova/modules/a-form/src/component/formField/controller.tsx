import type { BehaviorForm } from '../../bean/behavior.form.jsx';
import { BeanControllerBase, deepExtend, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { IFormFieldLayoutOptionsBase, IFormFieldOptions } from '../../types/formField.js';
import { IFormProvider } from '../../types/provider.js';

export interface ControllerFormFieldProps<TParentData = unknown> extends IFormFieldOptions<TParentData>, IFormFieldLayoutOptionsBase {
  formProvider?: IFormProvider;
}

@Controller()
export class ControllerFormField extends BeanControllerBase {
  static $propsDefault = {};

  formProvider: IFormProvider;

  @Use({ injectionScope: 'host' })
  $$behaviorForm: BehaviorForm;

  protected async __init__() {
    this.formProvider = this.$useComputed(() => {
      return deepExtend({}, this.$$behaviorForm.formProvider, this.$props.formProvider);
    });
  }
}
