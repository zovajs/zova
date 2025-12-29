import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { constFieldProps, IFormFieldOptions, IFormFieldRenderContext } from '../../types/formField.js';

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
    renderContext.options.renderFlattern = this.$$form.getRenderFlattern(renderContext.options.render);
    renderContext.options.renderProvider = this.$$form.getRenderProvider(renderContext.options.render);
    // props
    renderContext.props = {
      name,
      class: renderContext.options.class,
    };
    return renderContext;
  }

  private _renderSlotDefault(renderContext: IFormFieldRenderContext<TParentData>) {
    if (this.$slotDefault) {
      return this.$slotDefault!(renderContext, this);
    }
    const celScope = this.$$form.getFieldCelScope(this.name, { render: renderContext });
    return this.$$form.zovaJsx.render(renderContext.options.render, renderContext.props, celScope);
  }

  private _getFieldComponentPropsTop() {
    if (this.$props[constFieldProps] === true) return;
    const celScope = this.$$form.getFieldCelScope(this.name);
    return this.$$form.getFieldComponentPropsTop(this.name, celScope);
  }
}
