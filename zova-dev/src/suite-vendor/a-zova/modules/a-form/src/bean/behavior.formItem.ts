import { VNode } from 'vue';
import { BeanBehaviorBase, Behavior, IDecoratorBehaviorOptions, NextBehavior } from 'zova-module-a-behavior';

export interface IBehaviorPropsInputFormItem {}

export interface IBehaviorPropsOutputFormItem {}

export interface IBehaviorOptionsFormItem extends IDecoratorBehaviorOptions {
  name?: string;
}

@Behavior<IBehaviorOptionsFormItem>()
export class BehaviorFormItem extends BeanBehaviorBase<
  IBehaviorOptionsFormItem,
  IBehaviorPropsInputFormItem,
  IBehaviorPropsOutputFormItem
> {
  protected render(_props: IBehaviorPropsInputFormItem, next: NextBehavior<IBehaviorPropsOutputFormItem>): VNode {
    return next();
  }
}
