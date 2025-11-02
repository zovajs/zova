import { SchemaObject } from 'openapi3-ts/oas31';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { IBehaviorItem } from 'zova-module-a-behavior';

@Render()
export class RenderFormField extends BeanRenderBase {
  public _renderField() {
    const name = this.$props.name;
    const property = this.$$behaviorForm.getProperty(name);
    const behaviors: IBehaviorItem = {};
    this._prepareBehaviorFormField(behaviors, name, property);
    this._prepareBehaviorFormFieldLayout(behaviors, name, property);
    const Component = this._getFieldComponent(property);
    return <Component behaviors={behaviors}></Component>;
  }

  public render() {
    if (this.$slots.default) return this.$slots.default(this.field);
    return this._renderField();
  }

  private _getFieldComponent(property?: SchemaObject) {
    let render = property?.rest?.render ?? 'text';
    if (typeof render === 'string') {
      render = this.formProvider.components?.[render] ?? (render.includes(':') ? render : 'input');
    }
    if (typeof render === 'function') return render;
    if (render.includes(':')) return this.$zovaComponent(render as any);
    return render;
  }

  private _prepareBehaviorFormField(behaviors: IBehaviorItem, name: string, _property?: SchemaObject) {
    const behaviorFormField = this.formProvider.behaviors?.formField;
    if (!behaviorFormField) return;
    behaviors[behaviorFormField] = this.getBehaviorFormFieldOptions(name);
  }

  private _prepareBehaviorFormFieldLayout(behaviors: IBehaviorItem, name: string, property?: SchemaObject) {
    const behaviorFormFieldLayout = this.formProvider.behaviors?.formFieldLayout;
    if (!behaviorFormFieldLayout) return;
    behaviors[behaviorFormFieldLayout] = this.getBehaviorFormFieldLayoutOptions(name, property);
  }
}
