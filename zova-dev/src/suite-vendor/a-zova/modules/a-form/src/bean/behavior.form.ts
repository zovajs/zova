import { VNode } from 'vue';
import { BeanBehaviorBase, Behavior, IDecoratorBehaviorOptions, NextBehavior } from 'zova-module-a-behavior';
import { ReturnTypeUseForm } from '../types/form.js';

export interface IBehaviorPropsInputForm {}

export interface IBehaviorPropsOutputForm {}

export interface IBehaviorOptionsForm<TFormData = unknown> extends IDecoratorBehaviorOptions {
  form: ReturnTypeUseForm<TFormData>;
}

@Behavior<IBehaviorOptionsForm>()
export class BehaviorForm extends BeanBehaviorBase<
  IBehaviorOptionsForm,
  IBehaviorPropsInputForm,
  IBehaviorPropsOutputForm
> {
  protected async __init__() {
    this.bean._setBean('$$form', this.$options.form);
  }

  protected render(_props: IBehaviorPropsInputForm, next: NextBehavior<IBehaviorPropsOutputForm>): VNode {
    return next();
  }
}
