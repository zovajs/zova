import type { BehaviorFormField } from './behavior.formField.js';
import { VNode } from 'vue';
import { Use } from 'zova';
import { BeanBehaviorBase, Behavior, IDecoratorBehaviorOptions, NextBehavior } from 'zova-module-a-behavior';
import { ControllerFormFieldProps } from '../.metadata/index.js';
import { TypeFormField } from '../types/form.js';
import { HTMLInputElementType } from '../types/formField.js';
import { IFormMeta } from '../types/formMeta.js';

export interface IBehaviorPropsInputFormFieldModel extends ControllerFormFieldProps {}

export interface IBehaviorPropsOutputFormFieldModel extends IBehaviorPropsInputFormFieldModel {
  name: string;
  value?: any;
  readonly?: boolean;
  type?: HTMLInputElementType;
  onInput?: (e: Event) => void;
  onBlur?: (e: Event) => void;
}

export interface IBehaviorOptionsFormFieldModel extends IDecoratorBehaviorOptions {}

@Behavior<IBehaviorOptionsFormFieldModel>()
export class BehaviorFormFieldModel extends BeanBehaviorBase<
  IBehaviorOptionsFormFieldModel,
  IBehaviorPropsInputFormFieldModel,
  IBehaviorPropsOutputFormFieldModel
> {
  @Use({ injectionScope: 'host' })
  $$behaviorFormField: BehaviorFormField;

  protected render(props: IBehaviorPropsInputFormFieldModel, next: NextBehavior<IBehaviorPropsOutputFormFieldModel>): VNode {
    props = this._patchProps(props);
    return next(props);
  }

  private _patchProps(props: IBehaviorPropsInputFormFieldModel) {
    const formMeta = this.$$behaviorFormField.formMeta;
    const field = this.$$behaviorFormField.field;
    props = this._patchProps_general(formMeta, field, props);
    if (this.$$behaviorTag.component === 'input') {
      return this._patchProps_input(formMeta, field, props);
    }
    return props;
  }

  private _patchProps_general(
    formMeta: IFormMeta | undefined,
    field: TypeFormField,
    props: IBehaviorPropsInputFormFieldModel,
  ): IBehaviorPropsOutputFormFieldModel {
    const propsPatch: IBehaviorPropsOutputFormFieldModel = {
      name: field.api.name,
      value: field.state.value,
    };
    if (formMeta?.formMode === 'view') {
      propsPatch.readonly = true;
    }
    return Object.assign(propsPatch, props);
  }

  private _patchProps_input(
    _formMeta: IFormMeta | undefined,
    field: TypeFormField,
    props: IBehaviorPropsInputFormFieldModel,
  ): IBehaviorPropsOutputFormFieldModel {
    const type = props.inputType ?? 'text';
    const propsPatch: Partial<IBehaviorPropsOutputFormFieldModel> = {
      type,
      onInput: (e: Event) => {
        field.api.handleChange((e.target as HTMLInputElement).value);
      },
      onBlur: (_e: Event) => {
        field.api.handleBlur();
      },
    };
    return Object.assign(propsPatch, props);
  }
}
