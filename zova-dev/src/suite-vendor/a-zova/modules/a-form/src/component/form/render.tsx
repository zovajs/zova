import { SchemaObject } from 'openapi3-ts/oas31';
import { VNode } from 'vue';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { ZFormField } from '../../.metadata/index.js';

@Render()
export class RenderForm extends BeanRenderBase {
  private _renderSchema(schema?: SchemaObject) {
    if (!schema) return;
    const children: VNode[] = [];
    const properties = schema.properties!;
    for (const name in properties) {
      children.push(
        <ZFormField key={name} name={name}></ZFormField>,
      );
    }
    return children;
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
        formField: this.$props.formField,
        formFieldLayout: this.$props.formFieldLayout,
      }}
      >
        <>{children}</>
      </form>
    );
  }
}
