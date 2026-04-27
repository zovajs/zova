import type { ControllerFormField, IFormFieldLayoutOptionsBase, IFormFieldRenderContext, TypeFormField } from 'zova-module-a-form';

import { classes } from 'typestyle';
import { VNode } from 'vue';
import { z } from 'zod';
import { Use } from 'zova';
import { invokeProp } from 'zova-jsx';
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
    if (renderContext.propsBucket.inline) {
      return this._renderInline(renderContext, vnode, field, error);
    }
    return this._renderBlock(renderContext, vnode, field, error);
  }

  private _renderInline(renderContext: IFormFieldRenderContext, vnode: VNode, field: TypeFormField, error: z.ZodError | undefined): VNode {
    const bordered = renderContext.propsBucket.bordered;
    const label = renderContext.propsBucket.label;
    const className = classes(
      'input',
      renderContext.propsBucket.classContainer,
      bordered && 'input-bordered',
      !field.state.meta.isValid && 'input-error',
    );
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
    const label = renderContext.propsBucket.label;
    const classNameContainer = classes('fieldset', renderContext.propsBucket.classContainer);
    return (
      <fieldset class={classNameContainer}>
        {!!label && <legend class="fieldset-legend">{label}</legend>}
        {invokeProp(renderContext.propsBucket.header)}
        {vnode}
        {!field.state.meta.isValid && (
          <div class="label">
            <span class="label-text-alt text-error">{error?.message}</span>
          </div>
        )}
        {invokeProp(renderContext.propsBucket.footer)}
      </fieldset>
    );
  }

  private _patchProps(renderContext: IFormFieldRenderContext) {
    const field = this.$$formField.field;
    if (renderContext.propsBucket.renderProvider === ('input' as any)) {
      this._patchProps_input(field, renderContext);
    }
  }

  private _patchProps_input(field: TypeFormField, renderContext: IFormFieldRenderContext) {
    if (!renderContext.propsBucket.inline) {
      renderContext.props.class = classes(
        renderContext.props.class,
        'input',
        this.$options.bordered && 'input-bordered',
        !field.state.meta.isValid && 'input-error',
      );
    }
  }
}
