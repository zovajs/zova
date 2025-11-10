import { catchError } from '@cabloy/utils';
import { SchemaObject } from 'openapi3-ts/oas31';
import { z } from 'zod';
import { deepExtend, UseScope } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { loadSchemaProperties, schemaToZodSchema, ScopeModuleAOpenapi } from 'zova-module-a-openapi';
import { BeanControllerFormBase } from '../../lib/beanControllerFormBase.js';
import { TypeFormOnShowErrorWithMeta, TypeFormOnSubmitWithMeta, TypeFormWithMeta } from '../../types/form.js';
import { IFormFieldLayoutOptionsBase, IFormFieldOptionsBase } from '../../types/formField.js';
import { IFormMeta } from '../../types/formMeta.js';
import { IFormProvider } from '../../types/provider.js';

export interface ControllerFormProps<TFormData extends {} = {}, TSubmitMeta = never> {
  data?: TFormData;
  schema?: SchemaObject;
  zodSchema?: z.ZodObject<any>;
  formMeta?: IFormMeta;
  formProvider?: IFormProvider;
  formField?: IFormFieldOptionsBase;
  formFieldLayout?: IFormFieldLayoutOptionsBase;
  onSubmit?: TypeFormOnSubmitWithMeta<TFormData, TSubmitMeta>;
  onShowError?: TypeFormOnShowErrorWithMeta<TFormData, TSubmitMeta>;
}

@Controller()
export class ControllerForm<TFormData extends {} = {}, TSubmitMeta = never> extends BeanControllerFormBase {
  static $propsDefault = {};

  form: TypeFormWithMeta<TFormData, TSubmitMeta>;
  formProvider: IFormProvider;
  schema: SchemaObject | undefined;
  zodSchema: z.ZodObject<any> | undefined;
  properties: SchemaObject[] | undefined;

  @UseScope()
  $$scopeModuleAOpenapi: ScopeModuleAOpenapi;

  protected async __init__() {
    this.form = this.$useComputed(() => {
      return this.$useForm<TFormData, TSubmitMeta>({
        defaultValues: this.$props.data,
        onSubmit: async data => {
          const [_, error] = await catchError(() => {
            return this.$props.onSubmit?.(data);
          });
          if (!error) return;
          this.$props.onShowError?.({ data, error });
          console.log(error);
        },
      });
    });
    this.formProvider = this.$useComputed(() => {
      return deepExtend({}, this.$$scopeModuleAOpenapi.config.restResource.form?.provider, this.$props.formProvider);
    });
    this.schema = this.$useComputed(() => {
      return this.$props.schema;
    });
    this.zodSchema = this.$useComputed(() => {
      if (this.$props.zodSchema) return this.$props.zodSchema;
      if (!this.$props.schema) return;
      return schemaToZodSchema<z.ZodObject<any>>(this.$props.schema);
    });
    this.properties = this.$useComputed(() => {
      return loadSchemaProperties(this.schema, 'form');
    });
  }

  public submit(submitMeta?: TSubmitMeta) {
    return this.form.handleSubmit(submitMeta as any);
  }
}
