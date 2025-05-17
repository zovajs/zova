import { ReferenceObject, SchemaObject } from 'openapi3-ts/oas31';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { IBehaviorItem } from 'zova-module-a-behavior';
import { IFormFieldLayoutOptionsBase } from '../../types/formField.js';

@Render()
export class RenderFormField extends BeanRenderBase {
  public _renderField() {
    const name = this.$props.name;
    const property = this.$$behaviorForm.getFieldSchema(name);
    if (!property) return;
    const behaviors: IBehaviorItem = {};
    this._prepareBehaviorFormField(behaviors, name, property);
    this._prepareBehaviorFormFieldLayout(behaviors, name, property);
    const Component = 'input';
    return <Component behaviors={behaviors}></Component>;
  }

  public render() {
    if (this.$slots.default) return this.$slots.default();
    return this._renderField();
  }

  private _prepareBehaviorFormField(behaviors: IBehaviorItem, name: string, _property: SchemaObject | ReferenceObject) {
    const behaviorFormField = this.formBehaviors.formField;
    if (!behaviorFormField) return;
    const zodSchemaField = this.$$behaviorForm.getFieldZodSchema(name);
    behaviors[behaviorFormField] = Object.assign({}, this.$$behaviorForm.formField, this.$props as any, {
      name,
      validators: {
        onChange: zodSchemaField,
      },
    });
  }

  private _prepareBehaviorFormFieldLayout(behaviors: IBehaviorItem, name: string, property: SchemaObject | ReferenceObject) {
    const behaviorFormFieldLayout = this.formBehaviors.formFieldLayout;
    if (!behaviorFormFieldLayout) return;
    behaviors[behaviorFormFieldLayout] = Object.assign({ bordered: true }, this.$$behaviorForm.formFieldLayout, this.$props as any, {
      label: property.description || name,
    } satisfies IFormFieldLayoutOptionsBase);
  }
}
