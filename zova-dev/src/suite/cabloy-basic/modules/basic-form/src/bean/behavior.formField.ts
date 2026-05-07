import type { ControllerFormField, IFormFieldRenderContext } from 'zova-module-a-form';

import { VNode } from 'vue';
import { Use } from 'zova';
import { BeanBehaviorBase, Behavior, IDecoratorBehaviorOptions, NextBehavior } from 'zova-module-a-behavior';

export interface IBehaviorPropsInputFormField extends IFormFieldRenderContext {}

export interface IBehaviorPropsOutputFormField extends IBehaviorPropsInputFormField {}

export interface IBehaviorOptionsFormField extends IDecoratorBehaviorOptions {}

@Behavior<IBehaviorOptionsFormField>()
export class BehaviorFormField extends BeanBehaviorBase<IBehaviorOptionsFormField, IBehaviorPropsInputFormField, IBehaviorPropsOutputFormField> {
  @Use({ injectionScope: 'host' })
  $$formField: ControllerFormField;

  protected render(renderContext: IFormFieldRenderContext, next: NextBehavior<IBehaviorPropsOutputFormField>): VNode {
    // this._patchProps(renderContext);
    return next(renderContext);
  }

  // private _patchProps(renderContext: IFormFieldRenderContext) {
  //   const $$form = this.$$formField.$$form;
  //   const formMeta = this.$$formField.formMeta;
  //   const field = this.$$formField.field;
  //   const needPatch = !isJsxComponent(renderContext.propsBucket.render) || $$form.isComponentFormField(renderContext.propsBucket.renderProvider);
  //   if (!needPatch) return;
  //   // propsPatch
  //   const propsPatch = this._patchProps_general(formMeta, field, renderContext);
  //   // merge
  //   if (!isEmptyObject(propsPatch)) {
  //     renderContext.props = Object.assign({}, propsPatch, renderContext.props);
  //   }
  // }

  // private _patchProps_general(formMeta: IFormMeta | undefined, _field: TypeFormField, renderContext: IFormFieldRenderContext) {
  //   const { propsBucket } = renderContext;
  //   const propsPatch: IFormFieldRenderContextProps = {};
  //   // class
  //   const classTemp = (typeof propsBucket.render === 'string' && propsBucket.options?.class) ?? propsBucket.class;
  //   const styleTemp = (typeof propsBucket.render === 'string' && propsBucket.options?.style) ?? propsBucket.style;
  //   if (!isNil(classTemp) || !isNil(styleTemp)) {
  //     propsPatch.class = classes(classTemp, this.$style(styleTemp));
  //   }
  //   // readonly
  //   const readonlyTemp = (typeof propsBucket.render === 'string' && propsBucket.options?.readonly) ?? propsBucket.readonly;
  //   if (!isNil(readonlyTemp)) {
  //     propsPatch.readonly = readonlyTemp;
  //   } else if (formMeta?.formMode === 'view') {
  //     propsPatch.readonly = true;
  //   }
  //   return propsPatch;
  // }
}
