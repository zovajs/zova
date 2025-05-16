import type { TypeControllerInnerProps } from 'zova';
import type { ControllerFormFieldProps } from '../../component/formField/controller.jsx';
import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerFormField } from '../../component/formField/controller.jsx';
import { RenderFormField } from '../../component/formField/render.jsx';

export type TypeControllerFormFieldPublicProps = {
  controllerRef?: (ref: ControllerFormField) => void;
} & ControllerFormFieldProps;

type ControllerInnerProps =
      TypeControllerInnerProps<ControllerFormFieldProps, keyof typeof ControllerFormField.$propsDefault>;
declare module 'zova-module-a-form' {
  export interface ControllerFormField {
    $props: ControllerInnerProps;
  }
}
declare module 'zova-module-a-form' {
  export interface RenderFormField extends ControllerFormField {}
}
export const ZFormField = defineComponent(
  (_props: TypeControllerFormFieldPublicProps) => {
    useController(ControllerFormField, RenderFormField, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
