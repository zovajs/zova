import type { TypeControllerInnerProps } from 'zova';
import type { ControllerFormFieldProps } from '../../component/formField/controller.jsx';
import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerFormField } from '../../component/formField/controller.jsx';

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

export const ZFormField = defineComponent(
  (_props: TypeControllerFormFieldPublicProps) => {
    useController(ControllerFormField, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(ControllerFormField.$componentOptions),
);
