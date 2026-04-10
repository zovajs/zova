import type { ControllerFormField, IFormFieldRenderContext, IFormFieldRenderContextProps, IFormMeta, TypeFormField } from 'zova-module-a-form';

import { isEmptyObject, isNil } from '@cabloy/utils';
import { VNode } from 'vue';
import z from 'zod';
import { cast, Use } from 'zova';
import { isNativeElement } from 'zova-jsx';
import { BeanBehaviorBase, Behavior, IDecoratorBehaviorOptions, NextBehavior } from 'zova-module-a-behavior';

export interface IBehaviorPropsInputFormField extends IFormFieldRenderContext {}

export interface IBehaviorPropsOutputFormField extends IBehaviorPropsInputFormField {}

export interface IBehaviorOptionsFormField extends IDecoratorBehaviorOptions {}

@Behavior<IBehaviorOptionsFormField>()
export class BehaviorFormField extends BeanBehaviorBase<IBehaviorOptionsFormField, IBehaviorPropsInputFormField, IBehaviorPropsOutputFormField> {
  @Use({ injectionScope: 'host' })
  $$formField: ControllerFormField;

  protected render(renderContext: IFormFieldRenderContext, next: NextBehavior<IBehaviorPropsOutputFormField>): VNode {
    this._patchProps(renderContext);
    return next(renderContext);
  }

  private _patchProps(renderContext: IFormFieldRenderContext) {
    const formMeta = this.$$formField.formMeta;
    const field = this.$$formField.field;
    const componentName =
      typeof renderContext.propsBucket.renderProvider === 'object'
        ? cast(renderContext.propsBucket.renderProvider)?.name
        : renderContext.propsBucket.renderProvider;
    // propsPatch
    let propsPatch = isNativeElement(componentName) ? {} : this._patchProps_general(formMeta, field, renderContext);
    // input
    if (componentName === 'VTextField') {
      propsPatch = this._patchProps_input(formMeta, field, renderContext, propsPatch);
    }
    // merge
    if (!isEmptyObject(propsPatch)) {
      renderContext.props = Object.assign({}, propsPatch, renderContext.props);
    }
  }

  private _patchProps_general(formMeta: IFormMeta | undefined, field: TypeFormField, renderContext: IFormFieldRenderContext) {
    const { propsBucket } = renderContext;
    const error = !field.state.meta.isValid;
    const errorObj = field.state.meta.errors[0] as z.ZodError | undefined;
    const onSetDisplayValueDefaultByValue = (value: any) => {
      this.$$formField.setDisplayValue(value);
    };
    const propsPatch: IFormFieldRenderContextProps = {
      'label': propsBucket.label as string | undefined,
      'modelValue': propsBucket.displayValue,
      'onUpdate:modelValue':
        propsBucket['onUpdate:modelValue'] !== undefined ? (propsBucket['onUpdate:modelValue'] ?? undefined) : onSetDisplayValueDefaultByValue,
      'errorMessages': error ? errorObj?.message : undefined,
    };
    if (!isNil(propsBucket.readonly)) {
      propsPatch.readonly = propsBucket.readonly;
    } else if (formMeta?.formMode === 'view') {
      propsPatch.readonly = true;
    }
    return propsPatch;
  }

  private _patchProps_input(
    _formMeta: IFormMeta | undefined,
    field: TypeFormField,
    renderContext: IFormFieldRenderContext,
    propsPatch: IFormFieldRenderContextProps,
  ) {
    const { propsBucket } = renderContext;
    const renderFlattern = propsBucket.renderFlattern;
    const inputType = this.$$formField.normalizeInputType(renderFlattern, propsBucket.inputType);
    return {
      ...propsPatch,
      type: inputType,
      placeholder: propsBucket.placeholder,
      prependIcon: propsBucket.iconPrefix,
      appendIcon: propsBucket.iconSuffix,
      onBlur:
        propsBucket.onBlur !== undefined
          ? (propsBucket.onBlur ?? undefined)
          : (_e: Event) => {
              field.api.handleBlur();
            },
    };
  }
}
