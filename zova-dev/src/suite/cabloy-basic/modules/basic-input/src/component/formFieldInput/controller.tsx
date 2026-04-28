import type { IComponentOptions } from 'zova';

import { pickObject } from '@cabloy/utils';
import { classes } from 'typestyle';
import { BeanControllerBase } from 'zova';
import { Controller } from 'zova-module-a-bean';
import { IFormFieldPresetOptions, ZFormField } from 'zova-module-a-form';
import { IInputOptions } from 'zova-module-basic-openapi';

export interface ControllerFormFieldInputProps extends IFormFieldPresetOptions {}

@Controller()
export class ControllerFormFieldInput extends BeanControllerBase {
  static $propsDefault = {};
  static $componentOptions: IComponentOptions = { inheritAttrs: false };

  protected async __init__() {}

  protected render() {
    return (
      <ZFormField
        {...this.$props}
        slotDefault={({ propsBucket, props }, $$formField) => {
          const className = !propsBucket.needHandleBorder
            ? props.class
            : classes(props.class, 'input', propsBucket.layout?.bordered && 'input-bordered', !$$formField.field.state.meta.isValid && 'input-error');
          const propsNew: IInputOptions = {
            type: 'text',
            placeholder: undefined,
            onInput: (e: Event) => {
              $$formField.setValue((e.target as HTMLInputElement).value);
            },
            onBlur: () => {
              $$formField.handleBlur();
            },
            ...props,
            ...pickObject(propsBucket, ['value']),
            ...propsBucket.preset?.input,
            class: className,
          };
          return <input {...propsNew}></input>;
        }}
      ></ZFormField>
    );
  }

  // private _patchProps_input(formMeta: IFormMeta | undefined, field: TypeFormField, renderContext: IFormFieldRenderContext) {
  //   const { propsBucket } = renderContext;
  //   const renderFlattern = propsBucket.renderFlattern;
  //   const inputType = this.$$formField.normalizeInputType(renderFlattern, propsBucket.inputType);
  //   const onSetDisplayValueDefault = (e: Event) => {
  //     this.$$formField.setDisplayValue((e.target as HTMLInputElement).value);
  //   };
  //   const propsPatch: IFormFieldRenderContextProps = {
  //     type: inputType,
  //     onChange:
  //       propsBucket.onChange !== undefined
  //         ? (propsBucket.onChange ?? undefined)
  //         : propsBucket.displayValueUpdateTiming === 'change'
  //           ? onSetDisplayValueDefault
  //           : undefined,
  //     onInput:
  //       propsBucket.onInput !== undefined
  //         ? (propsBucket.onInput ?? undefined)
  //         : propsBucket.displayValueUpdateTiming !== 'change'
  //           ? onSetDisplayValueDefault
  //           : undefined,
  //     onBlur:
  //       propsBucket.onBlur !== undefined
  //         ? (propsBucket.onBlur ?? undefined)
  //         : (_e: Event) => {
  //             field.api.handleBlur();
  //           },
  //   };
  //   renderContext.props = Object.assign({}, propsGeneral, propsPatch, renderContext.props);
  // }
}
