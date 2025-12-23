import { SchemaObject } from 'openapi3-ts/oas31';
import { VNode } from 'vue';
import { BeanRenderBase, cast } from 'zova';
import { Render } from 'zova-module-a-bean';

@Render()
export class RenderForm extends BeanRenderBase {
  private _renderSchema() {
    if (!this.properties) return;
    const children: VNode[] = [];
    for (const property of this.properties) {
      const child = this._renderField(property);
      if (child) {
        children.push(child);
      }
    }
    return children;
  }

  private _renderField(property: SchemaObject) {
    const key = property.key!;
    const visible = property.rest?.visible ?? cast(property.rest?.render)?.props?.vIf;
    const visibleReal = this.fieldEvaluateExpressions(key, visible);
    if (visibleReal === false) return;
    const ComponentFormField = this._getFieldComponent(property);
    return (
      <ComponentFormField key={key} name={key}></ComponentFormField>
    );
  }

  private _getFieldComponent(property: SchemaObject) {
    const render = property?.rest?.render ?? 'text';
    if (typeof render === 'string' && render.includes(':')) {
      return this.$zovaComponent(render as any);
    }
    if (typeof render === 'object' && typeof render.type === 'string' && render.type.includes(':')) {
      return this.$zovaComponent(render as any);
    }
    return this.$zovaComponent(this.formProvider.components!.formField!);
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
      <form
        class={this.$props.inline ? 'inline' : ''}
        onSubmit={(e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          this.form.handleSubmit();
        }}
      >
        <>{children}</>
      </form>
    );
  }
}
