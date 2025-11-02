import type { BehaviorForm } from '../../bean/behavior.form.jsx';
import { useField } from '@tanstack/vue-form';
import { SchemaObject } from 'openapi3-ts/oas31';
import { BeanControllerBase, deepExtend, Use } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { TypeFormField } from '../../types/form.js';
import { IFormFieldLayoutOptionsBase, IFormFieldOptions } from '../../types/formField.js';
import { IFormProvider } from '../../types/provider.js';

export interface ControllerFormFieldProps<TParentData = unknown> extends IFormFieldOptions<TParentData>, IFormFieldLayoutOptionsBase {
  formProvider?: IFormProvider;
}

@Controller()
export class ControllerFormField extends BeanControllerBase {
  static $propsDefault = {};

  formProvider: IFormProvider;
  field: TypeFormField;

  @Use({ injectionScope: 'host' })
  $$behaviorForm: BehaviorForm;

  protected async __init__() {
    this.formProvider = this.$useComputed(() => {
      return deepExtend({}, this.$$behaviorForm.formProvider, this.$props.formProvider);
    });
    const options = this.getBehaviorFormFieldOptions(this.$props.name);
    this.field = useField({ ...options, form: this.$$behaviorForm.form }) as any;
  }

  protected getBehaviorFormFieldOptions(name: string) {
    const zodSchemaField = this.$$behaviorForm.getFieldZodSchema(name);
    return deepExtend({}, this.$$behaviorForm.formField, this.$props as any, {
      name,
      validators: {
        onChange: zodSchemaField,
      },
      formProvider: this.formProvider,
    });
  }

  protected getBehaviorFormFieldLayoutOptions(name: string, property?: SchemaObject) {
    return deepExtend({ bordered: true }, this.$$behaviorForm.formFieldLayout, this.$props as any, {
      label: this.$props.label ?? property?.title ?? name,
    } satisfies IFormFieldLayoutOptionsBase);
  }
}
