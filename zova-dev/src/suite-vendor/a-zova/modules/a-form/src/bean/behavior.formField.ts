import type { ControllerFormField } from '../component/formField/controller.jsx';
import { VNode } from 'vue';
import { Use } from 'zova';
import { BeanBehaviorBase, Behavior, IDecoratorBehaviorOptions, NextBehavior } from 'zova-module-a-behavior';
import { TypeFormField } from '../types/form.js';
import { IFormFieldRenderContext, IFormFieldRenderContextProps } from '../types/formField.js';
import { IFormMeta } from '../types/formMeta.js';

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
    if (renderContext.propsBucket.renderProvider === 'input') {
      this._patchProps_input(formMeta, field, renderContext);
    }
  }

  private _patchProps_general(
    formMeta: IFormMeta | undefined,
    _field: TypeFormField,
    renderContext: IFormFieldRenderContext,
  ) {
    const propsPatch: IFormFieldRenderContextProps = {
      value: renderContext.propsBucket.displayValue,
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
    const renderFlattern = renderContext.propsBucket.renderFlattern;
    const propsGeneral = this._patchProps_general(formMeta, field, renderContext);
    const inputType = this.$$formField.normalizeInputType(renderFlattern, renderContext.propsBucket.inputType);
    const propsPatch: IFormFieldRenderContextProps = {
      type: inputType,
      onChange: renderContext.propsBucket.onChange ?? undefined,
      onInput: renderContext.propsBucket.onInput !== undefined
        ? (renderContext.propsBucket.onInput ?? undefined)
        : (e: Event) => {
            this.$$formField.handleDisplayValueUpdate((e.target as HTMLInputElement).value, renderContext.options.onDisplayValueUpdate);
          },
      onBlur: renderContext.propsBucket.onBlur !== undefined
        ? (renderContext.propsBucket.onBlur ?? undefined)
        : (_e: Event) => {
            field.api.handleBlur();
          },
    };
    renderContext.props = Object.assign({}, propsGeneral, propsPatch, renderContext.props);
  }
}
