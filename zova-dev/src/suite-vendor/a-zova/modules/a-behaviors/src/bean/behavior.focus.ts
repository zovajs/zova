import type { VNode } from 'vue';
import type { IDecoratorBehaviorOptions, NextBehavior } from 'zova-module-a-behavior';
import { BeanBehaviorBase, Behavior } from 'zova-module-a-behavior';

export interface IBehaviorPropsInputFocus {}

export interface IBehaviorPropsOutputFocus extends IBehaviorPropsInputFocus {}

export interface IBehaviorOptionsFocus extends IDecoratorBehaviorOptions {}

@Behavior<IBehaviorOptionsFocus>()
export class BehaviorFocus extends BeanBehaviorBase<
  IBehaviorOptionsFocus,
  IBehaviorPropsInputFocus,
  IBehaviorPropsOutputFocus
> {
  protected render(props: IBehaviorPropsInputFocus, next: NextBehavior<IBehaviorPropsOutputFocus>): VNode {
    props = {
      ...props,
      ref: (ref: HTMLElement) => {
        ref.focus();
      },
    };
    return next(props);
  }
}
