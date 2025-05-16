import { SchemaObject } from 'openapi3-ts/oas31';
import { z } from 'zod';
import { Controller } from 'zova-module-a-bean';
import { BeanControllerFormBase, IFormBehaviors, IFormMeta, TypeForm, TypeFormOnSubmit } from 'zova-module-a-form';
import { schemaToZodSchema } from 'zova-module-a-openapi';

export interface ControllerRestFormProps<T extends {} = {}> {
  data?: T;
  schema?: SchemaObject;
  formMeta?: IFormMeta;
  formBehaviors?: IFormBehaviors;
  onSubmit?: TypeFormOnSubmit<T>;
}

@Controller()
export class ControllerRestForm extends BeanControllerFormBase {
  static $propsDefault = {};

  form: TypeForm;
  formBehaviors: IFormBehaviors;
  zodSchema: z.AnyZodObject | undefined;

  protected async __init__() {
    this.form = this.$useForm({
      defaultValues: this.$props.data as any,
      onSubmit: async data => {
        this.$props.onSubmit?.(data as any);
      },
    });
    this.formBehaviors = this.$useComputed(() => {
      return Object.assign({
        formFieldLayout: 'devui-restform:formFieldLayout',
      }, this.$props.formBehaviors);
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
