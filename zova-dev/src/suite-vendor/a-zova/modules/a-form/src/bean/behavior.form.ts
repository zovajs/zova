import { VNode } from 'vue';
import { BeanBehaviorBase, Behavior, IDecoratorBehaviorOptions, NextBehavior } from 'zova-module-a-behavior';
import { TypeBehaviorFormOptions } from '../types/form.js';

export interface IBehaviorPropsInputForm {}

export interface IBehaviorPropsOutputForm {}

export interface IBehaviorOptionsForm extends IDecoratorBehaviorOptions {
  options: TypeBehaviorFormOptions<unknown>;
}

@Behavior<IBehaviorOptionsForm>()
export class BehaviorForm extends BeanBehaviorBase<
  IBehaviorOptionsForm,
  IBehaviorPropsInputForm,
  IBehaviorPropsOutputForm
> {
  protected render(_props: IBehaviorPropsInputForm, next: NextBehavior<IBehaviorPropsOutputForm>): VNode {
    return next();
  }
}
