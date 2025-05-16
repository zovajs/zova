import type { BehaviorFormField, IFormFieldLayoutOptions } from 'zova-module-a-form';
import { VNode } from 'vue';
import { Use } from 'zova';
import { BeanBehaviorBase, Behavior, IDecoratorBehaviorOptions, NextBehavior } from 'zova-module-a-behavior';

export interface IBehaviorPropsInputFormFieldLayout {}

export interface IBehaviorPropsOutputFormFieldLayout {}

export interface IBehaviorOptionsFormFieldLayout extends IDecoratorBehaviorOptions, IFormFieldLayoutOptions {}

@Behavior<IBehaviorOptionsFormFieldLayout>()
export class BehaviorFormFieldLayout extends BeanBehaviorBase<
  IBehaviorOptionsFormFieldLayout,
  IBehaviorPropsInputFormFieldLayout,
  IBehaviorPropsOutputFormFieldLayout
> {
  @Use({ injectionScope: 'host' })
  $$behaviorFormField: BehaviorFormField;

  protected render(_props: IBehaviorPropsInputFormFieldLayout, next: NextBehavior<IBehaviorPropsOutputFormFieldLayout>): VNode {
    const field = this.$$behaviorFormField.field;
    const vnode = next();
    return (
      <>
        <label htmlFor={field.api.name}>{this.$options.label}</label>
        {vnode}
      </>
    );
  }
}
