import type { ControllerFormField, IFormFieldRenderContext, IFormFieldRenderContextProps, IFormMeta, TypeFormField } from 'zova-module-a-form';
import { VNode } from 'vue';
import z from 'zod';
import { cast, Use } from 'zova';
import { BeanBehaviorBase, Behavior, IDecoratorBehaviorOptions, NextBehavior } from 'zova-module-a-behavior';

export interface IBehaviorPropsInputFormField extends IFormFieldRenderContext {}

export interface IBehaviorPropsOutputFormField extends IBehaviorPropsInputFormField {}

export interface IBehaviorOptionsFormField extends IDecoratorBehaviorOptions {}

@Behavior<IBehaviorOptionsFormField>()
export class BehaviorFormField extends BeanBehaviorBase<
  IBehaviorOptionsFormField,
  IBehaviorPropsInputFormField,
  IBehaviorPropsOutputFormField
> {
  @Use({ injectionScope: 'host' })
  $$formField: ControllerFormField;

  protected render(renderContext: IFormFieldRenderContext, next: NextBehavior<IBehaviorPropsOutputFormField>): VNode {
    this._patchProps(renderContext);
    return next(renderContext);
  }

  private _patchProps(renderContext: IFormFieldRenderContext) {
    const formMeta = this.$$formField.formMeta;
    const field = this.$$formField.field;
    const componentName = typeof renderContext.propsBucket.renderProvider === 'object' ? cast(renderContext.propsBucket.renderProvider)?.name : renderContext.propsBucket.renderProvider;
    if (componentName === 'VTextField') {
      this._patchProps_input(formMeta, field, renderContext);
    }
  }

  private _patchProps_general(
    formMeta: IFormMeta | undefined,
    _field: TypeFormField,
    _renderContext: IFormFieldRenderContext,
  ) {
    const propsPatch: IFormFieldRenderContextProps = {
      // value: renderContext.propsBucket.displayValue,
    };
    if (formMeta?.formMode === 'view') {
      propsPatch.readonly = true;
    }
    return propsPatch;
  }

  private _patchProps_input(
    formMeta: IFormMeta | undefined,
    field: TypeFormField,
    renderContext: IFormFieldRenderContext,
  ) {
    const { propsBucket } = renderContext;
    const renderFlattern = propsBucket.renderFlattern;
    const propsGeneral = this._patchProps_general(formMeta, field, renderContext);
    const inputType = this.$$formField.normalizeInputType(renderFlattern, propsBucket.inputType);
    const error = !field.state.meta.isValid;
    const errorObj = field.state.meta.errors[0] as z.ZodError | undefined;
    // const onSetDisplayValueDefault = (e: Event) => {
    //   this.$$formField.setDisplayValue((e.target as HTMLInputElement).value);
    // };
    const onSetDisplayValueDefaultByValue = (value: any) => {
      this.$$formField.setDisplayValue(value);
    };
    const propsPatch: IFormFieldRenderContextProps = {
      'type': inputType,
      'label': propsBucket.label as string | undefined,
      'placeholder': propsBucket.placeholder,
      'modelValue': propsBucket.displayValue,
      'onUpdate:modelValue': propsBucket['onUpdate:modelValue'] !== undefined
        ? (propsBucket['onUpdate:modelValue'] ?? undefined)
        : onSetDisplayValueDefaultByValue,
      'errorMessages': error ? errorObj?.message : undefined,
      // onChange: propsBucket.onChange !== undefined
      //   ? (propsBucket.onChange ?? undefined)
      //   : (propsBucket.displayValueUpdateTiming === 'change' ? onSetDisplayValueDefault : undefined),
      // onInput: propsBucket.onInput !== undefined
      //   ? (propsBucket.onInput ?? undefined)
      //   : (propsBucket.displayValueUpdateTiming !== 'change' ? onSetDisplayValueDefault : undefined),
      'prependIcon': propsBucket.iconPrefix,
      'appendIcon': propsBucket.iconSuffix,
      'onBlur': propsBucket.onBlur !== undefined
        ? (propsBucket.onBlur ?? undefined)
        : (_e: Event) => {
            field.api.handleBlur();
          },
    };
    // merge
    renderContext.props = Object.assign({}, propsGeneral, propsPatch, renderContext.props);
  }
}
