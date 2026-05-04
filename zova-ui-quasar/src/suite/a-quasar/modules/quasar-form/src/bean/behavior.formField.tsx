import type { ControllerFormField, IFormFieldRenderContext, IFormFieldRenderContextProps, IFormMeta, TypeFormField } from 'zova-module-a-form';

import { isEmptyObject, isNil } from '@cabloy/utils';
import { QIcon } from 'quasar';
import { classes } from 'typestyle';
import { VNode } from 'vue';
import z from 'zod';
import { Use } from 'zova';
import { isJsxComponent } from 'zova-jsx';
import { BeanBehaviorBase, Behavior, IDecoratorBehaviorOptions, NextBehavior } from 'zova-module-a-behavior';

export interface IBehaviorPropsInputFormField extends IFormFieldRenderContext {}

export interface IBehaviorPropsOutputFormField extends IBehaviorPropsInputFormField {}

export interface IBehaviorOptionsFormField extends IDecoratorBehaviorOptions {}

@Behavior<IBehaviorOptionsFormField>()
export class BehaviorFormField extends BeanBehaviorBase<IBehaviorOptionsFormField, IBehaviorPropsInputFormField, IBehaviorPropsOutputFormField> {
  @Use({ injectionScope: 'host' })
  $$formField: ControllerFormField;

  protected render(renderContext: IFormFieldRenderContext, next: NextBehavior<IBehaviorPropsOutputFormField>): VNode {
    this._patchProps(renderContext);
    return next(renderContext);
  }

  private _patchProps(renderContext: IFormFieldRenderContext) {
    const $$form = this.$$formField.$$form;
    const formMeta = this.$$formField.formMeta;
    const field = this.$$formField.field;
    const needPatch = !isJsxComponent(renderContext.propsBucket.render) || $$form.isComponentFormField(renderContext.propsBucket.renderProvider);
    if (!needPatch) return;
    // propsPatch
    const propsPatch = this._patchProps_general(formMeta, field, renderContext);
    // merge
    if (!isEmptyObject(propsPatch)) {
      renderContext.props = Object.assign({}, propsPatch, renderContext.props);
    }
    if (componentName === 'QInput') {
      this._patchProps_input(formMeta, field, renderContext);
    }
  }

  private _patchProps_general(formMeta: IFormMeta | undefined, _field: TypeFormField, renderContext: IFormFieldRenderContext) {
    const { propsBucket } = renderContext;
    const propsPatch: IFormFieldRenderContextProps = {};
    // class
    const classTemp = (typeof propsBucket.render === 'string' && propsBucket.preset?.[propsBucket.render]?.class) ?? propsBucket.class;
    const styleTemp = (typeof propsBucket.render === 'string' && propsBucket.preset?.[propsBucket.render]?.style) ?? propsBucket.style;
    if (!isNil(classTemp) || !isNil(styleTemp)) {
      propsPatch.class = classes(classTemp, this.$style(styleTemp));
    }
    // readonly
    const readonlyTemp = (typeof propsBucket.render === 'string' && propsBucket.preset?.[propsBucket.render]?.readonly) ?? propsBucket.readonly;
    if (!isNil(readonlyTemp)) {
      propsPatch.readonly = readonlyTemp;
    } else if (formMeta?.formMode === 'view') {
      propsPatch.readonly = true;
    }
    return propsPatch;
  }

  private _patchProps_input(formMeta: IFormMeta | undefined, field: TypeFormField, renderContext: IFormFieldRenderContext) {
    const { propsBucket } = renderContext;
    const renderFlattern = propsBucket.renderFlattern;
    const propsGeneral = this._patchProps_general(formMeta, field, renderContext);
    const inputType = this.$$formField.normalizeInputType(renderFlattern, propsBucket.inputType);
    const error = !field.state.meta.isValid;
    const errorObj = field.state.meta.errors[0] as z.ZodError | undefined;
    // const onSetDisplayValueDefault = (e: Event) => {
    //   this.$$formField.setDisplayValue((e.target as HTMLInputElement).value);
    // };
    const onSetDisplayValueDefaultByValue = (value: any) => {
      this.$$formField.setDisplayValue(value);
    };
    const propsPatch: IFormFieldRenderContextProps = {
      'type': inputType,
      'label': propsBucket.label,
      'modelValue': propsBucket.displayValue,
      'onUpdate:modelValue':
        propsBucket['onUpdate:modelValue'] !== undefined ? (propsBucket['onUpdate:modelValue'] ?? undefined) : onSetDisplayValueDefaultByValue,
      'noErrorIcon': true,
      error,
      'errorMessage': errorObj?.message,
      // onChange: propsBucket.onChange !== undefined
      //   ? (propsBucket.onChange ?? undefined)
      //   : (propsBucket.displayValueUpdateTiming === 'change' ? onSetDisplayValueDefault : undefined),
      // onInput: propsBucket.onInput !== undefined
      //   ? (propsBucket.onInput ?? undefined)
      //   : (propsBucket.displayValueUpdateTiming !== 'change' ? onSetDisplayValueDefault : undefined),
      'onBlur':
        propsBucket.onBlur !== undefined
          ? (propsBucket.onBlur ?? undefined)
          : (_e: Event) => {
              field.api.handleBlur();
            },
    };
    // slots
    const slots: any = {};
    if (propsBucket.iconPrefix) {
      slots.prepend = () => <QIcon name={propsBucket.iconPrefix}></QIcon>;
    }
    if (propsBucket.iconSuffix) {
      slots.append = () => <QIcon name={propsBucket.iconSuffix}></QIcon>;
    }
    if (!isEmptyObject(slots)) {
      propsPatch['v-slots'] = slots;
    }
    // merge
    renderContext.props = Object.assign({}, propsGeneral, propsPatch, renderContext.props);
  }
}
