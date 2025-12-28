import { BeanRenderBase } from 'zova';
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
        render: 'text',
      },
      this.$$form.$props.formFieldLayout,
      propsTop,
      this.$props as IFormFieldOptions<TParentData>,
    );
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
    return this.$$form.zovaJsx.render(this.renderType, renderContext.props, celScope);
  }

  private _getFieldComponentPropsTop() {
    if (this.$$form.renderAuto) return;
    const celScope = this.$$form.getFieldCelScope(this.name);
    return this.$$form.getFieldComponentPropsTop(this.name, celScope);
  }
}
