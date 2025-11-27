import type { BehaviorFormField, IBehaviorPropsInputFormFieldLayoutBase, IBehaviorPropsOutputFormFieldLayoutBase, IFormFieldLayoutOptionsBase, TypeFormField } from 'zova-module-a-form';
import { classes } from 'typestyle';
import { VNode } from 'vue';
import { z } from 'zod';
import { Use } from 'zova';
import { BeanBehaviorBase, Behavior, IDecoratorBehaviorOptions, NextBehavior } from 'zova-module-a-behavior';

export interface IBehaviorPropsInputFormFieldLayout extends IBehaviorPropsInputFormFieldLayoutBase {}

export interface IBehaviorPropsOutputFormFieldLayout extends IBehaviorPropsInputFormFieldLayout, IBehaviorPropsOutputFormFieldLayoutBase {}

export interface IBehaviorOptionsFormFieldLayout extends IDecoratorBehaviorOptions, IFormFieldLayoutOptionsBase {}

@Behavior<IBehaviorOptionsFormFieldLayout>()
export class BehaviorFormFieldLayout extends BeanBehaviorBase<
  IBehaviorOptionsFormFieldLayout,
  IBehaviorPropsInputFormFieldLayout,
  IBehaviorPropsOutputFormFieldLayout
> {
  @Use({ injectionScope: 'host' })
  $$behaviorFormField: BehaviorFormField;

  protected render(props: IBehaviorPropsInputFormFieldLayout, next: NextBehavior<IBehaviorPropsOutputFormFieldLayout>): VNode {
    const field = this.$$behaviorFormField.field;
    props = this._patchProps(props);
    const vnode = next(props);
    const error = field.state.meta.errors[0] as z.ZodError | undefined;
    if (this.$options.inline) {
      return this._renderInline(props, vnode, field, error);
    }
    return this._renderBlock(props, vnode, field, error);
  }

  private _renderInline(_props: IBehaviorPropsInputFormFieldLayout, vnode: VNode, field: TypeFormField, error: z.ZodError | undefined): VNode {
    const className = classes('input', this.$options.bordered && 'input-bordered', !field.state.meta.isValid && 'input-error');
    return (
      <label class={className}>
        {this.$options.label}
        {vnode}
        {!field.state.meta.isValid && (
          <div class="label">
            <span class="label-text-alt text-error">{error?.message}</span>
          </div>
        )}
      </label>
    );
  }

  private _renderBlock(_props: IBehaviorPropsInputFormFieldLayout, vnode: VNode, field: TypeFormField, error: z.ZodError | undefined): VNode {
    return (
      <fieldset class="fieldset">
        {!!this.$options.label && <legend class="fieldset-legend">{this.$options.label}</legend>}
        {vnode}
        {!field.state.meta.isValid && (
          <div class="label">
            <span class="label-text-alt text-error">{error?.message}</span>
          </div>
        )}
      </fieldset>
    );
  }

  private _patchProps(props: IBehaviorPropsInputFormFieldLayout): IBehaviorPropsOutputFormFieldLayout {
    const field = this.$$behaviorFormField.field;
    props = this._patchProps_general(field, props);
    if (this.$$behaviorTag.component === 'input') {
      return this._patchProps_input(field, props);
    }
    return props;
  }

  private _patchProps_general(_field: TypeFormField, props: IBehaviorPropsInputFormFieldLayout): IBehaviorPropsOutputFormFieldLayout {
    const propsPatch: IBehaviorPropsOutputFormFieldLayout = {};
    return Object.assign({}, props, propsPatch);
  }

  private _patchProps_input(field: TypeFormField, props: IBehaviorPropsInputFormFieldLayout): IBehaviorPropsOutputFormFieldLayout {
    const propsPatch: IBehaviorPropsOutputFormFieldLayout = {};
    if (!this.$options.inline) {
      propsPatch.class = classes(
        props.class,
        'input',
        this.$options.bordered && 'input-bordered',
        !field.state.meta.isValid && 'input-error',
      );
    }
    return Object.assign({}, props, propsPatch);
  }
}
