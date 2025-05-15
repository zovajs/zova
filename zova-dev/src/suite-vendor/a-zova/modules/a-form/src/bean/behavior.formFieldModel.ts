import type { BehaviorFormField, TypeFormField } from 'zova-module-a-form';
import { VNode } from 'vue';
import { Use } from 'zova';
import { BeanBehaviorBase, Behavior, IDecoratorBehaviorOptions, NextBehavior } from 'zova-module-a-behavior';

export interface IBehaviorPropsInputFormFieldModel {
  name?: string;
  value?: any;
  onInput?: (e: Event) => void;
  onBlur?: (e: Event) => void;
}

export interface IBehaviorPropsOutputFormFieldModel {}

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
    const field = this.$$behaviorFormField.field;
    if (this.$$behaviorTag.component === 'input') {
      return this._patchProps_input(field, props);
    }
    return props;
  }

  private _patchProps_input(field: TypeFormField, props: IBehaviorPropsInputFormFieldModel) {
    return Object.assign({
      name: field.api.name,
      value: field.state.value,
      onInput: (e: Event) => {
        field.api.handleChange((e.target as HTMLInputElement).value);
      },
      onBlur: (_e: Event) => {
        field.api.handleBlur();
      },
    } satisfies IBehaviorPropsInputFormFieldModel, props);
  }
}
