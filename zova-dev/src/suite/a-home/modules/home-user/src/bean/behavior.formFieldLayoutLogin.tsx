import type { VNode } from 'vue';
import type { IDecoratorBehaviorOptions, NextBehavior } from 'zova-module-a-behavior';
import { BeanBehaviorBase, Behavior } from 'zova-module-a-behavior';
import { IFormFieldLayoutOptionsBase } from 'zova-module-a-form';
import { ZIcon } from 'zova-module-a-icon';

export interface IBehaviorPropsInputFormFieldLayoutLogin {}

export interface IBehaviorPropsOutputFormFieldLayoutLogin extends IBehaviorPropsInputFormFieldLayoutLogin {}

export interface IBehaviorOptionsFormFieldLayoutLogin extends IDecoratorBehaviorOptions, IFormFieldLayoutOptionsBase {}

@Behavior<IBehaviorOptionsFormFieldLayoutLogin>()
export class BehaviorFormFieldLayoutLogin extends BeanBehaviorBase<
  IBehaviorOptionsFormFieldLayoutLogin,
  IBehaviorPropsInputFormFieldLayoutLogin,
  IBehaviorPropsOutputFormFieldLayoutLogin
> {
  protected render(_props: IBehaviorPropsInputFormFieldLayoutLogin, next: NextBehavior<IBehaviorPropsOutputFormFieldLayoutLogin>): VNode {
    const vnode = next();
    return (
      <label class="input input-bordered flex items-center gap-2">
        <ZIcon class="opacity-70" name={this.$options.iconPrefix} width={16}></ZIcon>
        {vnode}
      </label>
    );
  }
}
