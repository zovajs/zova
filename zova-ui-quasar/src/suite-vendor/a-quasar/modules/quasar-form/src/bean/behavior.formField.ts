import type { VNode } from 'vue';
import type { IDecoratorBehaviorOptions, NextBehavior } from 'zova-module-a-behavior';
import { BeanBehaviorBase, Behavior } from 'zova-module-a-behavior';

export interface IBehaviorPropsInputFormField {}

export interface IBehaviorPropsOutputFormField extends IBehaviorPropsInputFormField {}

export interface IBehaviorOptionsFormField extends IDecoratorBehaviorOptions {}

@Behavior<IBehaviorOptionsFormField>()
export class BehaviorFormField extends BeanBehaviorBase<
  IBehaviorOptionsFormField,
  IBehaviorPropsInputFormField,
  IBehaviorPropsOutputFormField
> {
  protected render(_props: IBehaviorPropsInputFormField, next: NextBehavior<IBehaviorPropsOutputFormField>): VNode {
    return next();
  }
}
