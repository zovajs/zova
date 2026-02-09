import type { VNode } from 'vue';
import type { IDecoratorBehaviorOptions, NextBehavior } from 'zova-module-a-behavior';
import { BeanBehaviorBase, Behavior } from 'zova-module-a-behavior';

export interface IBehaviorPropsInputFormFieldLayout {}

export interface IBehaviorPropsOutputFormFieldLayout extends IBehaviorPropsInputFormFieldLayout {}

export interface IBehaviorOptionsFormFieldLayout extends IDecoratorBehaviorOptions {}

@Behavior<IBehaviorOptionsFormFieldLayout>()
export class BehaviorFormFieldLayout extends BeanBehaviorBase<
  IBehaviorOptionsFormFieldLayout,
  IBehaviorPropsInputFormFieldLayout,
  IBehaviorPropsOutputFormFieldLayout
> {
  protected render(_props: IBehaviorPropsInputFormFieldLayout, next: NextBehavior<IBehaviorPropsOutputFormFieldLayout>): VNode {
    return next();
  }
}
