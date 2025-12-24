import { SchemaObject } from 'openapi3-ts/oas31';
import { VNode } from 'vue';
import { BeanRenderBase, cast } from 'zova';
import { Render } from 'zova-module-a-bean';
import { renderFieldTopPropsSystem, TypeRenderComponentJsx } from 'zova-module-a-openapi';

@Render()
export class RenderForm extends BeanRenderBase {
  private _renderSchema() {
    if (!this.properties) return;
    const children: VNode[] = [];
    for (const property of this.properties) {
      const child = this._renderField(property);
      if (child) {
        if (Array.isArray(child)) {
          children.push(...child);
        } else {
          children.push(child);
        }
      }
    }
    return children;
  }

  private _renderField(property: SchemaObject) {
    const key = property.key!;
    // celContext
    const celContext = this.getFieldExpressionContext(key);
    // visible
    const visible = property.rest?.visible ?? cast(property.rest?.render)?.props?.vIf;
    const visibleReal = this.fieldEvaluateExpressions(visible, celContext);
    if (visibleReal === false) return;
    const componentOptions = this._getFieldComponentOptionsTop(property);
    const props = this._getFieldComponentPropsTop(property, celContext);
    return this.renderJsx(componentOptions, props, celContext);
  }

  private _getFieldComponentPropsTop(property: SchemaObject, celContext: {}) {
    const key = property.key!;
    const props = { key, name: key };
    const rest = property.rest;
    if (!rest) return props;
    const keys = Object.keys(rest).filter(item => !renderFieldTopPropsSystem.includes(item));
    if (keys.length === 0) return props;
    for (const key of keys) {
      const keyValue = this.fieldEvaluateExpressions(rest[key], celContext);
      props[key] = keyValue;
    }
    return props;
  }

  private _getFieldComponentOptionsTop(property: SchemaObject): TypeRenderComponentJsx {
    const render = property?.rest?.render;
    if (typeof render === 'string' && render.includes(':formField')) {
      return {
        type: render,
      };
    }
    if (typeof render === 'object' && typeof render.type === 'string' && render.type.includes(':formField')) {
      return render;
    }
    return {
      type: this.formProvider.components!.formField!,
    };
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
        {children}
      </form>
    );
  }
}
