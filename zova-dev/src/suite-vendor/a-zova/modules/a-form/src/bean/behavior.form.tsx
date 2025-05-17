import { DeepKeys } from '@tanstack/table-core';
import { SchemaObject } from 'openapi3-ts/oas31';
import { createCommentVNode, VNode } from 'vue';
import { z } from 'zod';
import { BeanBehaviorBase, Behavior, IDecoratorBehaviorOptions, NextBehavior } from 'zova-module-a-behavior';
import { schemaToZodSchema } from 'zova-module-a-openapi';
import { TypeForm } from '../types/form.js';
import { IFormFieldLayoutOptionsBase, IFormFieldOptionsBase } from '../types/formField.js';
import { IFormMeta } from '../types/formMeta.js';
import { IFormProvider } from '../types/provider.js';

export interface IBehaviorPropsInputForm {
  onSubmit?: ((payload: Event) => void);
}

export interface IBehaviorPropsOutputForm {}

export interface IBehaviorOptionsForm<TFormData = unknown> extends IDecoratorBehaviorOptions {
  form?: TypeForm<TFormData>;
  formMeta?: IFormMeta;
  formProvider?: IFormProvider;
  schema?: SchemaObject;
  zodSchema?: z.AnyZodObject;
  onFormSubmit?: ((payload: Event) => void) | boolean;
  formField?: IFormFieldOptionsBase;
  formFieldLayout?: IFormFieldLayoutOptionsBase;
}

@Behavior<IBehaviorOptionsForm>()
export class BehaviorForm<TFormData = unknown> extends BeanBehaviorBase<
  IBehaviorOptionsForm,
  IBehaviorPropsInputForm,
  IBehaviorPropsOutputForm
> {
  zodSchema: z.AnyZodObject | undefined;

  protected async __init__(options: IBehaviorOptionsForm) {
    super.__init__(options);
    this.bean._setBean('$$behaviorForm', this);
    this.zodSchema = this.$useComputed(() => {
      if (this.$options.zodSchema) return this.$options.zodSchema;
      if (!this.schema) return;
      return schemaToZodSchema<z.AnyZodObject>(this.schema);
    });
  }

  public get form() {
    return this.$options.form!;
  }

  public get formMeta() {
    return this.$options.formMeta;
  }

  public get formProvider() {
    return this.$options.formProvider;
  }

  public get schema() {
    return this.$options.schema;
  }

  public get formField() {
    return this.$options.formField;
  }

  public get formFieldLayout() {
    return this.$options.formFieldLayout;
  }

  public getFieldSchema<K extends DeepKeys<TFormData>>(name: K): SchemaObject | undefined {
    return this.schema?.properties?.[name as any] as unknown as SchemaObject | undefined;
  }

  public getFieldZodSchema<K extends DeepKeys<TFormData>>(name: K) {
    return this.zodSchema?.shape[name];
  }

  protected render(props: IBehaviorPropsInputForm, next: NextBehavior<IBehaviorPropsOutputForm>): VNode {
    if (!this.$options.form) return createCommentVNode();
    props = this._patchProps(props);
    return next(props);
  }

  private _patchProps(props: IBehaviorPropsInputForm) {
    const propsPatch: IBehaviorPropsInputForm = {};
    if (!props.onSubmit && this.$options.onFormSubmit !== false) {
      propsPatch.onSubmit = typeof this.$options.onFormSubmit === 'function'
        ? this.$options.onFormSubmit
        : (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
            this.$options.form?.handleSubmit();
          };
    }
    return Object.assign({}, props, propsPatch);
  }
}
