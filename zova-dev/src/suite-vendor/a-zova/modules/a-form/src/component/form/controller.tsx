import { SchemaObject } from 'openapi3-ts/oas31';
import { z } from 'zod';
import { Controller } from 'zova-module-a-bean';
import { schemaToZodSchema } from 'zova-module-a-openapi';
import { BeanControllerFormBase } from '../../lib/beanControllerFormBase.js';
import { TypeForm, TypeFormOnSubmit } from '../../types/form.js';
import { IFormFieldLayoutOptionsBase, IFormFieldOptionsBase } from '../../types/formField.js';
import { IFormMeta } from '../../types/formMeta.js';
import { IFormProvider } from '../../types/provider.js';

export interface ControllerFormProps<T extends {} = {}> {
  data?: T;
  schema?: SchemaObject;
  formMeta?: IFormMeta;
  formProvider?: IFormProvider;
  onSubmit?: TypeFormOnSubmit<T>;
  formField?: IFormFieldOptionsBase;
  formFieldLayout?: IFormFieldLayoutOptionsBase;
}

@Controller()
export class ControllerForm extends BeanControllerFormBase {
  static $propsDefault = {};

  form: TypeForm;
  formProvider: IFormProvider;
  zodSchema: z.AnyZodObject | undefined;

  protected async __init__() {
    this.form = this.$useForm({
      defaultValues: this.$props.data as any,
      onSubmit: async data => {
        this.$props.onSubmit?.(data as any);
      },
    });
    this.formProvider = this.$useComputed(() => {
      return this.$props.formProvider || {};
    });
    this.zodSchema = this.$useComputed(() => {
      if (!this.$props.schema) return;
      return schemaToZodSchema<z.AnyZodObject>(this.$props.schema);
    });
  }

  public submit() {
    return this.form.handleSubmit();
  }
}
