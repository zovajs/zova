import { ReferenceObject, SchemaObject } from 'openapi3-ts/oas31';
import { VNode } from 'vue';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { IBehaviorItem } from 'zova-module-a-behavior';

@Render()
export class RenderRestForm extends BeanRenderBase {
  private _renderSchema(schema: SchemaObject) {
    const children: VNode[] = [];
    const properties = schema.properties!;
    for (const key in properties) {
      const property = properties[key];
      const behaviors: IBehaviorItem = {};
      this._prepareBehaviorFormField(behaviors, key, property);
      this._prepareBehaviorFormFieldLayout(behaviors, key, property);
      children.push(
        <input behaviors={behaviors}></input>,
      );
    }
    return children;
  }

  private _prepareBehaviorFormField(behaviors: IBehaviorItem, key: string, _property: SchemaObject | ReferenceObject) {
    const zodSchemaField = this.zodSchema?.shape[key];
    behaviors['a-form:formField'] = {
      name: key,
      validators: {
        onChange: zodSchemaField,
      },
    };
  }

  private _prepareBehaviorFormFieldLayout(behaviors: IBehaviorItem, key: string, property: SchemaObject | ReferenceObject) {
    const behaviorFormFieldLayout = this.formBehaviors.formFieldLayout as 'devui-restform:formFieldLayout';
    behaviors[behaviorFormFieldLayout] = {
      label: property.description || key,
      bordered: true,
    };
  }

  public render() {
    if (!this.$props.schema) return;
    return (
      <form bs-form={{
        form: this.form,
        formMeta: this.$props.formMeta,
        formBehaviors: this.formBehaviors,
        schema: this.$props.schema,
        zodSchema: this.zodSchema,
      }}
      >
        <>
          {this._renderSchema(this.$props.schema)}
          <button type="submit" class="hidden"></button>
        </>
      </form>
    );
  }
}
