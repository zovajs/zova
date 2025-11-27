import type { VNode } from 'vue';
import type { IDecoratorBehaviorOptions, NextBehavior } from 'zova-module-a-behavior';
import { BeanBehaviorBase, Behavior } from 'zova-module-a-behavior';

export interface IBehaviorPropsInputFormFieldLayoutFilter {}

export interface IBehaviorPropsOutputFormFieldLayoutFilter extends IBehaviorPropsInputFormFieldLayoutFilter {}

export interface IBehaviorOptionsFormFieldLayoutFilter extends IDecoratorBehaviorOptions {}

@Behavior<IBehaviorOptionsFormFieldLayoutFilter>()
export class BehaviorFormFieldLayoutFilter extends BeanBehaviorBase<
  IBehaviorOptionsFormFieldLayoutFilter,
  IBehaviorPropsInputFormFieldLayoutFilter,
  IBehaviorPropsOutputFormFieldLayoutFilter
> {
  protected render(_props: IBehaviorPropsInputFormFieldLayoutFilter, next: NextBehavior<IBehaviorPropsOutputFormFieldLayoutFilter>): VNode {
    return next();
  }
}
