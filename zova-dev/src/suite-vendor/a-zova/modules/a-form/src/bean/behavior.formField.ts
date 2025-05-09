import type { BehaviorForm } from './behavior.form.js';
import { useField } from '@tanstack/vue-form';
import { VNode } from 'vue';
import { Use } from 'zova-core';
import { BeanBehaviorBase, Behavior, IDecoratorBehaviorOptions, NextBehavior } from 'zova-module-a-behavior';
import { ReturnTypeUseFormField, TypeBehaviorFormFieldOptions } from '../types/form.js';

export interface IBehaviorPropsInputFormField {}

export interface IBehaviorPropsOutputFormField {}

export interface IBehaviorOptionsFormField<TParentData = unknown> extends IDecoratorBehaviorOptions, TypeBehaviorFormFieldOptions<TParentData> {
}

@Behavior<IBehaviorOptionsFormField>()
export class BehaviorFormField extends BeanBehaviorBase<
  IBehaviorOptionsFormField,
  IBehaviorPropsInputFormField,
  IBehaviorPropsOutputFormField
> {
  @Use()
  $$behaviorForm: BehaviorForm;

  $$formField: ReturnTypeUseFormField;

  protected async __init__(options: IBehaviorOptionsFormField) {
    super.__init__(options);
    this.$$formField = useField({ ...options, form: this.$$behaviorForm.form });
    this.bean._setBean('$$formField', this.$$formField);
  }

  protected render(_props: IBehaviorPropsInputFormField, next: NextBehavior<IBehaviorPropsOutputFormField>): VNode {
    return next();
  }
}
