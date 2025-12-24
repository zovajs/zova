import type { VNode } from 'vue';
import type { IDecoratorBehaviorOptions, NextBehavior } from 'zova-module-a-behavior';
import type { ControllerFormField, IFormFieldRenderContext, TypeFormField } from 'zova-module-a-form';
import z from 'zod';
import { Use } from 'zova';
import { BeanBehaviorBase, Behavior } from 'zova-module-a-behavior';
import { IFormFieldLayoutOptionsBase } from 'zova-module-a-form';
import { ZIcon } from 'zova-module-a-icon';

export interface IBehaviorPropsInputFormFieldLayoutLogin extends IFormFieldRenderContext {}

export interface IBehaviorPropsOutputFormFieldLayoutLogin extends IBehaviorPropsInputFormFieldLayoutLogin {}

export interface IBehaviorOptionsFormFieldLayoutLogin extends IDecoratorBehaviorOptions, IFormFieldLayoutOptionsBase {}

@Behavior<IBehaviorOptionsFormFieldLayoutLogin>()
export class BehaviorFormFieldLayoutLogin extends BeanBehaviorBase<
  IBehaviorOptionsFormFieldLayoutLogin,
  IBehaviorPropsInputFormFieldLayoutLogin,
  IBehaviorPropsOutputFormFieldLayoutLogin
> {
  @Use({ injectionScope: 'host' })
  $$formField: ControllerFormField;

  protected render(renderContext: IFormFieldRenderContext, next: NextBehavior<IBehaviorPropsOutputFormFieldLayoutLogin>): VNode {
    const field = this.$$formField.field;
    this._patchProps(renderContext);
    const vnode = next(renderContext);
    const iconPrefix = renderContext.options.iconPrefix;
    const error = field.state.meta.errors[0] as z.ZodError | undefined;
    return (
      <label class="input input-bordered flex items-center gap-2 w-full">
        <ZIcon class="opacity-70" name={iconPrefix} width={16}></ZIcon>
        {vnode}
        {!field.state.meta.isValid && (
          <div class="label">
            <span class="label-text-alt text-error">{error?.message}</span>
          </div>
        )}
      </label>
    );
  }

  private _patchProps(renderContext: IFormFieldRenderContext) {
    const field = this.$$formField.field;
    if (this.$$behaviorTag.component === 'input') {
      return this._patchProps_input(field, renderContext);
    }
  }

  private _patchProps_input(_field: TypeFormField, _renderContext: IFormFieldRenderContext) {
    // renderContext.props.class = classes(renderContext.props.class, 'input', !field.state.meta.isValid && 'input-error');
  }
}
