import type { ControllerFormField } from '../component/formField/controller.jsx';
import { VNode } from 'vue';
import { Use } from 'zova';
import { BeanBehaviorBase, Behavior, IDecoratorBehaviorOptions, NextBehavior } from 'zova-module-a-behavior';
import { TypeFormField } from '../types/form.js';
import { IFormFieldModelOptionsBase, IFormFieldRenderContext, IFormFieldRenderContextProps } from '../types/formField.js';
import { IFormMeta } from '../types/formMeta.js';

export interface IBehaviorPropsInputFormFieldModel extends IFormFieldRenderContext {}

export interface IBehaviorPropsOutputFormFieldModel extends IBehaviorPropsInputFormFieldModel {}

export interface IBehaviorOptionsFormFieldModel extends IDecoratorBehaviorOptions, IFormFieldModelOptionsBase {}

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
    if (this.$$behaviorTag.component === 'input') {
      this._patchProps_input(formMeta, field, renderContext);
    }
  }

  private _patchProps_general(
    formMeta: IFormMeta | undefined,
    field: TypeFormField,
  ) {
    const propsPatch: Partial<IFormFieldRenderContextProps> = {
      value: field.state.value,
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
    const propsGeneral = this._patchProps_general(formMeta, field);
    const inputType = renderContext.options.inputType ?? 'text';
    const propsPatch: Partial<IFormFieldRenderContextProps> & { type: string } = {
      type: inputType,
      onInput: (e: Event) => {
        field.api.handleChange((e.target as HTMLInputElement).value);
      },
      onBlur: (_e: Event) => {
        field.api.handleBlur();
      },
    };
    renderContext.props = Object.assign({}, propsGeneral, propsPatch, renderContext.props);
  }
}
