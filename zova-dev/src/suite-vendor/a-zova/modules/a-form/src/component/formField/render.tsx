import { createVNode } from 'vue';
import { BeanRenderBase } from 'zova';
import { Render } from 'zova-module-a-bean';
import { IFormFieldOptions, IFormFieldRenderContext } from '../../types/formField.js';

@Render()
export class RenderFormField<TParentData extends {} = {}> extends BeanRenderBase {
  public render() {
    const property = this.property;
    const name = this.name;
    const propsTop = this._getFieldComponentPropsTop();
    const renderContext: IFormFieldRenderContext<TParentData> = {
      options: Object.assign(
        {
          bordered: this.scope.config.formFieldLayout.bordered,
          label: property?.title ?? name,
        },
        this.$$form.$props.formFieldLayout,
        propsTop,
        this.$props as IFormFieldOptions<TParentData>,
      ),
      props: {
        name,
      },
    };
    return this.$$beanBehaviorsHolder.render((renderProps: IFormFieldRenderContext<TParentData>) => {
      return this._renderSlotDefault(renderProps);
    }, renderContext);
  }

  private _renderSlotDefault(renderContext: IFormFieldRenderContext<TParentData>) {
    if (this.$slotDefault) {
      return this.$slotDefault!(renderContext, this.field);
    }
    const restRender = this.property?.rest?.render;
    if (restRender && typeof restRender === 'object') {
      const celContext = {
        ...this.$$form.getFieldExpressionContext(this.name),
        render: renderContext,
      };
      return this.$$form.renderJsx(restRender, renderContext.props, celContext);
    }
    return createVNode(this.$$beanBehaviorsHolder.options.behaviorTag.component, renderContext.props as any);
  }

  private _getFieldComponentPropsTop() {
    if (this.$$form.renderAuto) return;
    const celContext = this.$$form.getFieldExpressionContext(this.name);
    return this.$$form.getFieldComponentPropsTop(this.name, celContext);
  }
}
