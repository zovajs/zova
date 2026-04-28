import type { ControllerFormField, IFormFieldRenderContext, TypeFormField } from 'zova-module-a-form';

import { classes } from 'typestyle';
import { VNode } from 'vue';
import { z } from 'zod';
import { Use } from 'zova';
import { invokeProp } from 'zova-jsx';
import { BeanBehaviorBase, Behavior, IDecoratorBehaviorOptions, NextBehavior } from 'zova-module-a-behavior';

export interface IBehaviorPropsInputFormFieldLayout extends IFormFieldRenderContext {}

export interface IBehaviorPropsOutputFormFieldLayout extends IBehaviorPropsInputFormFieldLayout {}

export interface IBehaviorOptionsFormFieldLayout extends IDecoratorBehaviorOptions {}

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
    const layout = renderContext.propsBucket.layout;
    // needHandleBorder
    renderContext.propsBucket.needHandleBorder = layout?.disable || !layout?.inline;
    const vnode = next(renderContext);
    if (layout?.disable) return vnode;
    const error = field.state.meta.errors[0] as z.ZodError | undefined;
    if (layout?.inline) {
      return this._renderInline(renderContext, vnode, field, error);
    }
    return this._renderBlock(renderContext, vnode, field, error);
  }

  private _renderInline(renderContext: IFormFieldRenderContext, vnode: VNode, field: TypeFormField, error: z.ZodError | undefined): VNode {
    const layout = renderContext.propsBucket.layout;
    const bordered = layout?.bordered;
    const label = layout?.label;
    const className = classes('input', layout?.class, bordered && 'input-bordered', !field.state.meta.isValid && 'input-error');
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
    const layout = renderContext.propsBucket.layout;
    const label = layout?.label;
    const classNameContainer = classes('fieldset', layout?.class);
    return (
      <fieldset class={classNameContainer}>
        {!!label && <legend class="fieldset-legend">{label}</legend>}
        {invokeProp(layout?.header)}
        {vnode}
        {!field.state.meta.isValid && (
          <div class="label">
            <span class="label-text-alt text-error">{error?.message}</span>
          </div>
        )}
        {invokeProp(layout?.footer)}
      </fieldset>
    );
  }
}
