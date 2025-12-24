import type { ControllerFormField } from '../component/formField/controller.jsx';
import { VNode } from 'vue';
import { Use } from 'zova';
import { BeanBehaviorBase, Behavior, IDecoratorBehaviorOptions, NextBehavior } from 'zova-module-a-behavior';
import { TypeFormField } from '../types/form.js';
import { IBehaviorPropsInputFormFieldModelBase, IBehaviorPropsOutputFormFieldModelBase, IFormFieldModelOptionsBase } from '../types/formField.js';
import { IFormMeta } from '../types/formMeta.js';

export interface IBehaviorPropsInputFormFieldModel extends IBehaviorPropsInputFormFieldModelBase {}

export interface IBehaviorPropsOutputFormFieldModel extends IBehaviorPropsInputFormFieldModel, IBehaviorPropsOutputFormFieldModelBase {}

export interface IBehaviorOptionsFormFieldModel extends IDecoratorBehaviorOptions, IFormFieldModelOptionsBase {}

@Behavior<IBehaviorOptionsFormFieldModel>()
export class BehaviorFormFieldModel extends BeanBehaviorBase<
  IBehaviorOptionsFormFieldModel,
  IBehaviorPropsInputFormFieldModel,
  IBehaviorPropsOutputFormFieldModel
> {
  @Use({ injectionScope: 'host' })
  $$formField: ControllerFormField;

  protected render(props: IBehaviorPropsInputFormFieldModel, next: NextBehavior<IBehaviorPropsOutputFormFieldModel>): VNode {
    props = this._patchProps(props);
    return next(props);
  }

  private _patchProps(props: IBehaviorPropsInputFormFieldModel) {
    const formMeta = this.$$formField.formMeta;
    const field = this.$$formField.field;
    if (this.$$behaviorTag.component === 'input') {
      return this._patchProps_input(formMeta, field, props);
    }
    return props;
  }

  private _patchProps_general(
    formMeta: IFormMeta | undefined,
    field: TypeFormField,
  ): IBehaviorPropsOutputFormFieldModel {
    const propsPatch: IBehaviorPropsOutputFormFieldModel = {
      name: field.api.name,
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
    props: IBehaviorPropsInputFormFieldModel,
  ): IBehaviorPropsOutputFormFieldModel {
    const propsGeneral = this._patchProps_general(formMeta, field);
    const type = props.type ?? 'text';
    const propsPatch: Partial<IBehaviorPropsOutputFormFieldModel> = {
      type,
      onInput: (e: Event) => {
        field.api.handleChange((e.target as HTMLInputElement).value);
      },
      onBlur: (_e: Event) => {
        field.api.handleBlur();
      },
    };
    return Object.assign({}, propsGeneral, propsPatch, props);
  }
}
