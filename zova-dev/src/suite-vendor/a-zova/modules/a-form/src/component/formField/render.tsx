import { BeanRenderBase } from 'zova';
import { isJsxComponent } from 'zova-jsx';
import { Render } from 'zova-module-a-bean';
import { IFormFieldOptions, IFormFieldRenderContext } from '../../types/formField.js';

@Render()
export class RenderFormField<TParentData extends {} = {}> extends BeanRenderBase {
  public render() {
    const renderContext = this._getRenderContext();
    return this.$$beanBehaviorsHolder.render((renderProps: IFormFieldRenderContext<TParentData>) => {
      return this._renderSlotDefault(renderProps);
    }, renderContext);
  }

  private _getRenderContext() {
    const property = this.property;
    const name = this.name;
    const renderContext: IFormFieldRenderContext<TParentData> = {} as any;
    // options
    const propsTop = this._getFieldComponentPropsTop();
    renderContext.options = Object.assign(
      {
        bordered: this.scope.config.formFieldLayout.bordered,
        label: property?.title ?? name,
        render: 'text', // default
        displayValue: this.$$form.getFieldValue(name),
      },
      this.$$form.$props.formFieldLayout,
      propsTop,
      this.$props as IFormFieldOptions<TParentData>,
    );
    // render
    renderContext.options.renderFlattern = this._getRenderFlattern(renderContext.options.render);
    renderContext.options.renderProvider = this._getRenderProvider(renderContext.options.renderFlattern);
    // props
    renderContext.props = {
      name,
      class: renderContext.options.class,
    };
    return renderContext;
  }

  private _renderSlotDefault(renderContext: IFormFieldRenderContext<TParentData>) {
    if (this.$slotDefault) {
      return this.$slotDefault!(renderContext, this.field);
    }
    const celScope = this.$$form.getFieldCelScope(this.name, { render: renderContext });
    return this.$$form.zovaJsx.render(renderContext.options.renderProvider, renderContext.props, celScope);
  }

  private _getFieldComponentPropsTop() {
    // need not check renderAuto
    // if (this.$$form.renderAuto) return;
    const celScope = this.$$form.getFieldCelScope(this.name);
    return this.$$form.getFieldComponentPropsTop(this.name, celScope);
  }

  private _getRenderFlattern(render: any) {
    return isJsxComponent(render) ? render.type : render;
  }

  private _getRenderProvider(renderFlattern: any) {
    let renderProvider = renderFlattern;
    if (typeof renderProvider === 'string') {
      renderProvider = this.formProvider.components?.[renderProvider] ?? renderProvider;
    }
    return renderProvider;
  }
}
