import type { BehaviorForm } from './behavior.form.js';
import { useField } from '@tanstack/vue-form';
import defu from 'defu';
import { VNode } from 'vue';
import { Use } from 'zova-core';
import { BeanBehaviorBase, Behavior, IDecoratorBehaviorOptions, NextBehavior } from 'zova-module-a-behavior';
import { ReturnTypeUseFormField, TypeBehaviorFormFieldOptions } from '../types/form.js';

export interface IBehaviorPropsInputFormField {
  name?: string;
  value?: any;
  onInput?: (e: Event) => void;
  onBlur?: (e: Event) => void;
}

export interface IBehaviorPropsOutputFormField {}

export interface IBehaviorOptionsFormField<TParentData = unknown> extends IDecoratorBehaviorOptions, TypeBehaviorFormFieldOptions<TParentData> {
}

@Behavior<IBehaviorOptionsFormField>()
export class BehaviorFormField extends BeanBehaviorBase<
  IBehaviorOptionsFormField,
  IBehaviorPropsInputFormField,
  IBehaviorPropsOutputFormField
> {
  @Use({ injectionScope: 'host' })
  $$behaviorForm: BehaviorForm;

  $$formField: ReturnTypeUseFormField;

  protected async __init__(options: IBehaviorOptionsFormField) {
    super.__init__(options);
    this.$$formField = useField({ ...options, form: this.$$behaviorForm.form });
    this.bean._setBean('$$formField', this.$$formField);
  }

  protected render(props: IBehaviorPropsInputFormField, next: NextBehavior<IBehaviorPropsOutputFormField>): VNode {
    props = this._patchProps(props);
    return next(props);
  }

  private _patchProps(props: IBehaviorPropsInputFormField) {
    const field = this.$$formField;
    if (this.$$behaviorTag.component === 'input') {
      return this._patchProps_input(field, props);
    }
    return props;
  }

  private _patchProps_input(field: ReturnTypeUseFormField, props: IBehaviorPropsInputFormField) {
    return defu(props, {
      name: field.api.name,
      value: field.state.value,
      onInput: (e: Event) => {
        field.api.handleChange((e.target as HTMLInputElement).value);
      },
      onBlur:(_e:Event)=>{
        field.api.handleBlur();
      }
    });
  }
}
