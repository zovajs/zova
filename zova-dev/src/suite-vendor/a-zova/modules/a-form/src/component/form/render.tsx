import { SchemaObject } from 'openapi3-ts/oas31';
import { h, VNode } from 'vue';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { TypeRenderComponentJsx } from 'zova-module-a-openapi';

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
    // celScope
    const celScope = this.getFieldExpressionContext(key);
    // visible
    const visible = this.fieldEvaluateExpressions(property.rest?.visible, celScope);
    if (visible === false) return;
    const componentOptions = this._getFieldComponentOptionsTop(property);
    const props = this.getFieldComponentPropsTop(key, celScope);
    return this.renderJsx(componentOptions, props, celScope);
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

  private _renderChildren() {
    const children: (VNode | undefined)[] = [];
    children.push(this.$props.slotHeader?.(this.formState, this.form));
    const bodyInner = this._renderBodyInner();
    if (this.$props.slotBody) {
      children.push(this.$props.slotBody(bodyInner, this.formState, this.form));
    } else {
      children.push(bodyInner);
    }
    children.push(this.$props.slotFooter?.(this.formState, this.form));
    return children;
  }

  private _renderBodyInner() {
    const FormTag = this.$props.formTag;
    return this.$slotDefault
      ? this.$slotDefault()
      : (
          <>
            {this._renderSchema()}
            {FormTag === 'form' && <button type="submit" class="hidden"></button>}
          </>
        );
  }

  private _renderProps() {
    const FormTag = this.$props.formTag;
    const props: any = {};
    if (this.$props.inline) {
      props.class = 'inline';
    }
    if (FormTag === 'form') {
      props.onSubmit = this.$props.onFormSubmit ?? ((e: SubmitEvent) => {
        e.preventDefault();
        e.stopPropagation();
        this.form.handleSubmit();
      });
    }
    return props;
  }

  public render() {
    const FormTag = this.$props.formTag;
    const props = this._renderProps();
    const children = this._renderChildren();
    return h(FormTag, props, children);
  }
}
