import { ZodMetadata } from '@cabloy/zod-openapi';
import { DeepKeys } from '@tanstack/table-core';
import { useStore } from '@tanstack/vue-form';
import { SchemaObject } from 'openapi3-ts/oas31';
import { createCommentVNode, VNode } from 'vue';
import { z } from 'zod';
import { deepExtend, UseScope } from 'zova';
import { BeanBehaviorBase, Behavior, IDecoratorBehaviorOptions, NextBehavior } from 'zova-module-a-behavior';
import { loadSchemaProperties, schemaToZodSchema, ScopeModuleAOpenapi } from 'zova-module-a-openapi';
import { TypeForm } from '../types/form.js';
import { IFormFieldLayoutOptionsBase, IFormFieldOptionsBase } from '../types/formField.js';
import { IFormMeta } from '../types/formMeta.js';
import { IFormProvider } from '../types/provider.js';

export interface IBehaviorPropsInputForm {
  onSubmit?: ((payload: Event) => void);
}

export interface IBehaviorPropsOutputForm {}

export interface IBehaviorOptionsForm<TFormData = unknown> extends IDecoratorBehaviorOptions {
  form: TypeForm<TFormData>;
  formMeta?: IFormMeta;
  formProvider?: IFormProvider;
  schema?: SchemaObject;
  zodSchema?: z.ZodObject<any>;
  properties?: SchemaObject[];
  formField?: IFormFieldOptionsBase;
  formFieldLayout?: IFormFieldLayoutOptionsBase;
  onFormSubmit?: ((payload: Event) => void) | boolean;
}

@Behavior<IBehaviorOptionsForm>()
export class BehaviorForm<TFormData = unknown> extends BeanBehaviorBase<
  IBehaviorOptionsForm,
  IBehaviorPropsInputForm,
  IBehaviorPropsOutputForm
> {
  zodSchema?: z.ZodObject<any>;
  properties?: SchemaObject[];

  formState: TypeForm<TFormData>['state'];

  @UseScope()
  $$scopeModuleAOpenapi: ScopeModuleAOpenapi;

  protected async __init__(options: IBehaviorOptionsForm) {
    super.__init__(options);
    this.bean._setBean('$$behaviorForm', this);
    this.formState = useStore(this.form.store, state => state) as any;
    this.zodSchema = this.$useComputed(() => {
      return this._getZodSchema();
    });
    this.properties = this.$useComputed(() => {
      if (this.$options.properties) return this.$options.properties;
      if (!this.schema) return;
      return loadSchemaProperties(this.schema, 'form');
    });
  }

  public get form() {
    return this.$options.form;
  }

  public get formMeta() {
    return this.$options.formMeta;
  }

  public get formProvider() {
    return deepExtend({}, this.$$scopeModuleAOpenapi.config.restResource.form?.provider, this.$options.formProvider);
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

  public getProperty<K extends DeepKeys<TFormData>>(name: K): SchemaObject | undefined {
    if (!this.properties) return;
    return this.properties.find(item => item.key === name);
  }

  public getFieldSchema<K extends DeepKeys<TFormData>>(name: K): SchemaObject | undefined {
    return this.schema?.properties?.[name as any] as unknown as SchemaObject | undefined;
  }

  public getFieldZodSchema<K extends DeepKeys<TFormData>>(name: K) {
    return ZodMetadata.getFieldSchema(this.zodSchema, name as string);
  }

  protected render(props: IBehaviorPropsInputForm, next: NextBehavior<IBehaviorPropsOutputForm>): VNode {
    if (!this.$options.form) return createCommentVNode();
    props = this._patchProps(props);
    return next(props);
  }

  private _getZodSchema() {
    if (this.$options.zodSchema) return this._patchZodSchema(this.$options.zodSchema);
    if (!this.schema) return;
    return this._patchZodSchema(schemaToZodSchema<z.ZodObject<any>>(this.schema));
  }

  private _patchZodSchema(schema: z.ZodObject<any> | z.ZodUnion<any>) {
    if (schema.def.type === 'object') return schema;
    if (schema.def.type === 'union') {
      return schema.def.options.find(item => item.def.type === 'object');
    }
    throw new Error('invalid zod schema');
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
