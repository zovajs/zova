import type { BehaviorFormField } from 'zova-module-a-form';
import { VNode } from 'vue';
import { Use } from 'zova';
import { BeanBehaviorBase, Behavior, IDecoratorBehaviorOptions, NextBehavior } from 'zova-module-a-behavior';

export interface IBehaviorPropsInputFormFieldLayout {
  class?: any;
}

export interface IBehaviorPropsOutputFormFieldLayout {}

export interface IBehaviorOptionsFormFieldLayout extends IDecoratorBehaviorOptions {
  label?: string | false;
}

@Behavior<IBehaviorOptionsFormFieldLayout>()
export class BehaviorFormFieldLayout extends BeanBehaviorBase<
  IBehaviorOptionsFormFieldLayout,
  IBehaviorPropsInputFormFieldLayout,
  IBehaviorPropsOutputFormFieldLayout
> {
  @Use({ injectionScope: 'host' })
  $$behaviorFormField: BehaviorFormField;

  protected render(props: IBehaviorPropsInputFormFieldLayout, next: NextBehavior<IBehaviorPropsOutputFormFieldLayout>): VNode {
    // const field = this.$$behaviorFormField.field;
    props = this._patchProps(props);
    const vnode = next(props);
    return (
      <label class="form-control w-full max-w-xs">
        {!!this.$options.label && (
          <div class="label">
            <span class="label-text">{this.$options.label}</span>
          </div>
        )}
        {vnode}

      </label>
    );
  }

  private _patchProps(props: IBehaviorPropsInputFormFieldLayout) {
    const propsPatch: IBehaviorPropsInputFormFieldLayout = {};
    return Object.assign({}, props, propsPatch);
  }
}
