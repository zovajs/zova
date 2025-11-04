import { VNode } from 'vue';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderForm extends BeanRenderBase {
  private _renderSchema() {
    if (!this.properties) return;
    const children: VNode[] = [];
    for (const property of this.properties) {
      const key = property.key!;
      const ComponentFormField = this.$zovaComponent(this.formProvider.components!.formField!);
      children.push(
        <ComponentFormField key={key} name={key}></ComponentFormField>,
      );
    }
    return children;
  }

  public render() {
    const children = this.$slotDefault
      ? this.$slotDefault()
      : (
          <>
            {this._renderSchema()}
            <button type="submit" class="hidden"></button>
          </>
        );
    return (
      <form bs-form={{
        form: this.form,
        formMeta: this.$props.formMeta,
        formProvider: this.formProvider,
        schema: this.schema,
        zodSchema: this.zodSchema,
        properties: this.properties,
        formField: this.$props.formField,
        formFieldLayout: this.$props.formFieldLayout,
      }}
      >
        <>{children}</>
      </form>
    );
  }
}
