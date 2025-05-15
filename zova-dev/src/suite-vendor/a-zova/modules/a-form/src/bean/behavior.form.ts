import { SchemaObject } from 'openapi3-ts/oas31';
import { createCommentVNode, VNode } from 'vue';
import { z } from 'zod';
import { BeanBehaviorBase, Behavior, IDecoratorBehaviorOptions, NextBehavior } from 'zova-module-a-behavior';
import { IFormBehaviors } from '../types/behavior.js';
import { TypeForm } from '../types/form.js';
import { IFormMeta } from '../types/formMeta.js';

export interface IBehaviorPropsInputForm {
  onSubmit?: ((payload: Event) => void);
}

export interface IBehaviorPropsOutputForm {}

export interface IBehaviorOptionsForm<TFormData = unknown> extends IDecoratorBehaviorOptions {
  form?: TypeForm<TFormData>;
  formMeta?: IFormMeta;
  formBehaviors?: IFormBehaviors;
  schema?: SchemaObject;
  zodSchema?: z.AnyZodObject;
  onSubmit?: ((payload: Event) => void) | boolean;
}

@Behavior<IBehaviorOptionsForm>()
export class BehaviorForm extends BeanBehaviorBase<
  IBehaviorOptionsForm,
  IBehaviorPropsInputForm,
  IBehaviorPropsOutputForm
> {
  protected async __init__(options: IBehaviorOptionsForm) {
    super.__init__(options);
    this.bean._setBean('$$behaviorForm', this);
  }

  public get form() {
    return this.$options.form!;
  }

  public get formMeta() {
    return this.$options.formMeta;
  }

  public get formBehaviors() {
    return this.$options.formBehaviors;
  }

  public get schema() {
    return this.$options.schema;
  }

  public get zodSchema() {
    return this.$options.zodSchema;
  }

  protected render(props: IBehaviorPropsInputForm, next: NextBehavior<IBehaviorPropsOutputForm>): VNode {
    if (!this.$options.form) return createCommentVNode();
    props = this._patchProps(props);
    return next(props);
  }

  private _patchProps(props: IBehaviorPropsInputForm) {
    const propsPatch: IBehaviorPropsInputForm = {};
    if (!props.onSubmit && this.$options.onSubmit !== false) {
      propsPatch.onSubmit = typeof this.$options.onSubmit === 'function'
        ? this.$options.onSubmit
        : (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
            this.$options.form?.handleSubmit();
          };
    }
    return Object.assign({}, props, propsPatch);
  }
}
