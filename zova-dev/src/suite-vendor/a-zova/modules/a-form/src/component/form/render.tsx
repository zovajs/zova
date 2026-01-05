import { SchemaObject } from 'openapi3-ts/oas31';
import { h, VNode } from 'vue';
import { BeanRenderBase, cast } from 'zova';
import { Render } from 'zova-module-a-bean';
import { TypeFormFieldRenderComponent } from 'zova-module-a-openapi';

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
    const celScope = this.getFieldCelScope(key);
    // props
    const props = this.getFieldComponentPropsTop(key, celScope);
    if (cast(props).visible === false) return;
    const componentOptions = this._getFieldComponentOptionsTop(props.render);
    return this.zovaJsx.render(componentOptions, props, celScope);
  }

  private _getFieldComponentOptionsTop(render: TypeFormFieldRenderComponent): TypeFormFieldRenderComponent {
    const renderProvider = this.getRenderProvider(render);
    if (typeof renderProvider === 'string' && renderProvider.includes(':formField')) {
      return render;
    }
    return this.formProvider.components!.formField!;
  }

  private _renderChildren() {
    const children: (VNode | undefined)[] = [];
    children.push(this.$props.slotHeader?.(this));
    const bodyInner = this._renderBodyInner();
    if (this.$props.slotBody) {
      children.push(this.$props.slotBody(bodyInner, this));
    } else {
      children.push(bodyInner);
    }
    children.push(this.$props.slotFooter?.(this));
    return children;
  }

  private _renderBodyInner() {
    const FormTag = this.$props.formTag;
    return this.$slotDefault
      ? this.$slotDefault(this)
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
      props.onSubmit = (e: SubmitEvent) => {
        if (this.$props.onFormSubmit) {
          this.$props.onFormSubmit(e, this);
        } else {
          e.preventDefault();
          e.stopPropagation();
          this.submit();
        }
      };
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
