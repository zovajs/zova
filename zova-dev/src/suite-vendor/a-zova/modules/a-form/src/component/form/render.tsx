import { ReferenceObject, SchemaObject } from 'openapi3-ts/oas31';
import { VNode } from 'vue';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { IBehaviorItem } from 'zova-module-a-behavior';
import { IFormFieldLayoutOptions } from 'zova-module-a-form';

@Render()
export class RenderForm extends BeanRenderBase {
  private _renderSchema(schema?: SchemaObject) {
    if (!schema) return;
    const children: VNode[] = [];
    const properties = schema.properties!;
    for (const key in properties) {
      const property = properties[key];
      const behaviors: IBehaviorItem = {};
      this._prepareBehaviorFormField(behaviors, key, property);
      this._prepareBehaviorFormFieldLayout(behaviors, key, property);
      const Component = 'input';
      children.push(
        <Component behaviors={behaviors}></Component>,
      );
    }
    return children;
  }

  private _prepareBehaviorFormField(behaviors: IBehaviorItem, key: string, _property: SchemaObject | ReferenceObject) {
    const behaviorFormField = this.formBehaviors.formField ?? 'a-form:formField';
    const zodSchemaField = this.zodSchema?.shape[key];
    behaviors[behaviorFormField] = Object.assign({
      name: key,
      validators: {
        onChange: zodSchemaField,
      },
    }, this.$props.formField);
  }

  private _prepareBehaviorFormFieldLayout(behaviors: IBehaviorItem, key: string, property: SchemaObject | ReferenceObject) {
    const behaviorFormFieldLayout = this.formBehaviors.formFieldLayout;
    if (!behaviorFormFieldLayout) return;
    behaviors[behaviorFormFieldLayout] = Object.assign({
      label: property.description || key,
      bordered: true,
    } satisfies IFormFieldLayoutOptions, this.$props.formFieldLayout);
  }

  public render() {
    const children = this.$slots.default
      ? this.$slots.default()
      : (
          <>
            {this._renderSchema(this.$props.schema)}
            <button type="submit" class="hidden"></button>
          </>
        );
    return (
      <form bs-form={{
        form: this.form,
        formMeta: this.$props.formMeta,
        formBehaviors: this.formBehaviors,
        schema: this.$props.schema,
        zodSchema: this.zodSchema,
      }}
      >
        <>{children}</>
      </form>
    );
  }
}
