import { SchemaObject } from 'openapi3-ts/oas31';
import { VNode } from 'vue';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderForm extends BeanRenderBase {
  private _renderSchema(schema?: SchemaObject) {
    if (!schema) return;
    const children: VNode[] = [];
    const properties = schema.properties!;
    for (const name in properties) {
      const ComponentFormField = this.$zovaComponent(this.formProvider.components!.formField!);
      children.push(
        <ComponentFormField key={name} name={name}></ComponentFormField>,
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
        formProvider: this.formProvider,
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
