import type { ControllerFormField, IFormFieldLayoutOptionsBase, IFormFieldRenderContext, TypeFormField } from 'zova-module-a-form';
import { classes } from 'typestyle';
import { VNode } from 'vue';
import { z } from 'zod';
import { Use } from 'zova';
import { BeanBehaviorBase, Behavior, IDecoratorBehaviorOptions, NextBehavior } from 'zova-module-a-behavior';

export interface IBehaviorPropsInputFormFieldLayout extends IFormFieldRenderContext {}

export interface IBehaviorPropsOutputFormFieldLayout extends IBehaviorPropsInputFormFieldLayout {}

export interface IBehaviorOptionsFormFieldLayout extends IDecoratorBehaviorOptions, IFormFieldLayoutOptionsBase {}

@Behavior<IBehaviorOptionsFormFieldLayout>()
export class BehaviorFormFieldLayout extends BeanBehaviorBase<
  IBehaviorOptionsFormFieldLayout,
  IBehaviorPropsInputFormFieldLayout,
  IBehaviorPropsOutputFormFieldLayout
> {
  @Use({ injectionScope: 'host' })
  $$formField: ControllerFormField;

  protected render(renderContext: IFormFieldRenderContext, next: NextBehavior<IBehaviorPropsOutputFormFieldLayout>): VNode {
    const field = this.$$formField.field;
    this._patchProps(renderContext);
    const vnode = next(renderContext);
    const error = field.state.meta.errors[0] as z.ZodError | undefined;
    if (renderContext.options.inline) {
      return this._renderInline(renderContext, vnode, field, error);
    }
    return this._renderBlock(renderContext, vnode, field, error);
  }

  private _renderInline(renderContext: IFormFieldRenderContext, vnode: VNode, field: TypeFormField, error: z.ZodError | undefined): VNode {
    const bordered = renderContext.options.bordered;
    const label = renderContext.options.label;
    const className = classes('input', renderContext.options.classLayout, bordered && 'input-bordered', !field.state.meta.isValid && 'input-error');
    return (
      <label class={className}>
        {label}
        {vnode}
        {!field.state.meta.isValid && (
          <div class="label">
            <span class="label-text-alt text-error">{error?.message}</span>
          </div>
        )}
      </label>
    );
  }

  private _renderBlock(renderContext: IFormFieldRenderContext, vnode: VNode, field: TypeFormField, error: z.ZodError | undefined): VNode {
    const label = renderContext.options.label;
    const className = classes('fieldset', renderContext.options.classLayout);
    return (
      <fieldset class={className}>
        {!!label && <legend class="fieldset-legend">{label}</legend>}
        {vnode}
        {!field.state.meta.isValid && (
          <div class="label">
            <span class="label-text-alt text-error">{error?.message}</span>
          </div>
        )}
      </fieldset>
    );
  }

  private _patchProps(renderContext: IFormFieldRenderContext) {
    const field = this.$$formField.field;
    if (this.$$behaviorTag.component === 'input') {
      this._patchProps_input(field, renderContext);
    }
  }

  private _patchProps_input(field: TypeFormField, renderContext: IFormFieldRenderContext) {
    if (!renderContext.options.inline) {
      renderContext.props.class = classes(
        renderContext.props.class,
        'input',
        this.$options.bordered && 'input-bordered',
        !field.state.meta.isValid && 'input-error',
      );
    }
  }
}
