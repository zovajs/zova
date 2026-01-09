import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { IFormFieldRenderContext, IFormFieldRenderContextProps } from '../../types/formField.js';

@Render()
export class RenderFormField<TParentData extends {} = {}> extends BeanRenderBase {
  public render() {
    const renderContext = this._getRenderContext();
    return this.$$beanBehaviorsHolder.render((renderProps: IFormFieldRenderContext<TParentData>) => {
      return this._renderSlotDefault(renderProps);
    }, renderContext);
  }

  private _getRenderContext(): IFormFieldRenderContext<TParentData> {
    const name = this.name;
    // propsBucket
    const propsBucket = this.propsBucket;
    // props
    const props: IFormFieldRenderContextProps = { name };
    if (propsBucket.class) {
      props.class = propsBucket.class;
    }
    // celScope
    const celScope = this.$$form.getFieldCelScope(this.name, {
      displayValue: propsBucket.displayValue,
    });
    return { propsBucket, props, celScope };
  }

  private _renderSlotDefault(renderContext: IFormFieldRenderContext<TParentData>) {
    if (this.$slotDefault) {
      return this.$slotDefault!(renderContext, this);
    }
    return this.$$form.zovaJsx.render(renderContext.propsBucket.render, renderContext.props, renderContext.celScope);
  }
}
