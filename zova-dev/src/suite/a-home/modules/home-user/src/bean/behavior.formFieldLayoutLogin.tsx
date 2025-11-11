import type { VNode } from 'vue';
import type { IDecoratorBehaviorOptions, NextBehavior } from 'zova-module-a-behavior';
import type { BehaviorFormField, IBehaviorPropsInputFormFieldLayoutBase, IBehaviorPropsOutputFormFieldLayoutBase, TypeFormField } from 'zova-module-a-form';
import z from 'zod';
import { Use } from 'zova';
import { BeanBehaviorBase, Behavior } from 'zova-module-a-behavior';
import { IFormFieldLayoutOptionsBase } from 'zova-module-a-form';
import { ZIcon } from 'zova-module-a-icon';

export interface IBehaviorPropsInputFormFieldLayoutLogin extends IBehaviorPropsInputFormFieldLayoutBase {}

export interface IBehaviorPropsOutputFormFieldLayoutLogin extends IBehaviorPropsInputFormFieldLayoutLogin, IBehaviorPropsOutputFormFieldLayoutBase {}

export interface IBehaviorOptionsFormFieldLayoutLogin extends IDecoratorBehaviorOptions, IFormFieldLayoutOptionsBase {}

@Behavior<IBehaviorOptionsFormFieldLayoutLogin>()
export class BehaviorFormFieldLayoutLogin extends BeanBehaviorBase<
  IBehaviorOptionsFormFieldLayoutLogin,
  IBehaviorPropsInputFormFieldLayoutLogin,
  IBehaviorPropsOutputFormFieldLayoutLogin
> {
  @Use({ injectionScope: 'host' })
  $$behaviorFormField: BehaviorFormField;

  protected render(props: IBehaviorPropsInputFormFieldLayoutLogin, next: NextBehavior<IBehaviorPropsOutputFormFieldLayoutLogin>): VNode {
    const field = this.$$behaviorFormField.field;
    props = this._patchProps(props);
    const vnode = next(props);
    const error = field.state.meta.errors[0] as z.ZodError | undefined;
    return (
      <label class="input input-bordered flex items-center gap-2 w-full">
        <ZIcon class="opacity-70" name={this.$options.iconPrefix} width={16}></ZIcon>
        {vnode}
        {!field.state.meta.isValid && (
          <div class="label">
            <span class="label-text-alt text-error">{error?.message}</span>
          </div>
        )}
      </label>
    );
  }

  private _patchProps(props: IBehaviorPropsInputFormFieldLayoutLogin): IBehaviorPropsOutputFormFieldLayoutLogin {
    const field = this.$$behaviorFormField.field;
    props = this._patchProps_general(field, props);
    if (this.$$behaviorTag.component === 'input') {
      return this._patchProps_input(field, props);
    }
    return props;
  }

  private _patchProps_general(_field: TypeFormField, props: IBehaviorPropsInputFormFieldLayoutLogin): IBehaviorPropsOutputFormFieldLayoutLogin {
    const propsPatch: IBehaviorPropsOutputFormFieldLayoutLogin = {};
    return Object.assign({}, props, propsPatch);
  }

  private _patchProps_input(_field: TypeFormField, props: IBehaviorPropsInputFormFieldLayoutLogin): IBehaviorPropsOutputFormFieldLayoutLogin {
    const propsPatch: IBehaviorPropsOutputFormFieldLayoutLogin = {};
    // propsPatch.class = classes(props.class, 'input', !field.state.meta.isValid && 'input-error');
    return Object.assign({}, props, propsPatch);
  }
}
