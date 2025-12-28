import type { ControllerFormField } from '../component/formField/controller.jsx';
import { VNode } from 'vue';
import { Use } from 'zova';
import { BeanBehaviorBase, Behavior, IDecoratorBehaviorOptions, NextBehavior } from 'zova-module-a-behavior';
import { TypeFormField } from '../types/form.js';
import { IFormFieldRenderContext, IFormFieldRenderContextProps } from '../types/formField.js';
import { IFormMeta } from '../types/formMeta.js';

export interface IBehaviorPropsInputFormFieldModel extends IFormFieldRenderContext {}

export interface IBehaviorPropsOutputFormFieldModel extends IBehaviorPropsInputFormFieldModel {}

export interface IBehaviorOptionsFormFieldModel extends IDecoratorBehaviorOptions {}

@Behavior<IBehaviorOptionsFormFieldModel>()
export class BehaviorFormFieldModel extends BeanBehaviorBase<
  IBehaviorOptionsFormFieldModel,
  IBehaviorPropsInputFormFieldModel,
  IBehaviorPropsOutputFormFieldModel
> {
  @Use({ injectionScope: 'host' })
  $$formField: ControllerFormField;

  protected render(renderContext: IFormFieldRenderContext, next: NextBehavior<IBehaviorPropsOutputFormFieldModel>): VNode {
    this._patchProps(renderContext);
    return next(renderContext);
  }

  private _patchProps(renderContext: IFormFieldRenderContext) {
    const formMeta = this.$$formField.formMeta;
    const field = this.$$formField.field;
    if (renderContext.options.renderProvider === 'input') {
      this._patchProps_input(formMeta, field, renderContext);
    }
  }

  private _patchProps_general(
    formMeta: IFormMeta | undefined,
    _field: TypeFormField,
    renderContext: IFormFieldRenderContext,
  ) {
    const propsPatch: IFormFieldRenderContextProps = {
      value: renderContext.options.displayValue,
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
    const renderFlattern = renderContext.options.renderFlattern;
    const propsGeneral = this._patchProps_general(formMeta, field, renderContext);
    const inputType = this.$$formField.normalizeInputType(renderFlattern, renderContext.options.inputType);
    const propsPatch: IFormFieldRenderContextProps = {
      type: inputType,
      onInput: (e: Event) => {
        this.$$formField.handleDisplayValueUpdate((e.target as HTMLInputElement).value, renderContext.options.onDisplayValueUpdate);
      },
      onBlur: (_e: Event) => {
        field.api.handleBlur();
      },
    };
    renderContext.props = Object.assign({}, propsGeneral, propsPatch, renderContext.props);
  }
}
