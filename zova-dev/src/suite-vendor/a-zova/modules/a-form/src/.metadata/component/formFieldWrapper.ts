import type { TypeControllerInnerProps } from 'zova';
import type { ControllerFormFieldWrapperProps } from '../../component/formFieldWrapper/controller.jsx';
import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerFormFieldWrapper } from '../../component/formFieldWrapper/controller.jsx';

export type TypeControllerFormFieldWrapperPublicProps = {
  controllerRef?: (ref: ControllerFormFieldWrapper) => void;
} & ControllerFormFieldWrapperProps;

type ControllerInnerProps =
  TypeControllerInnerProps<ControllerFormFieldWrapperProps, keyof typeof ControllerFormFieldWrapper.$propsDefault>;
declare module 'zova-module-a-form' {
  export interface ControllerFormFieldWrapper {
    $props: ControllerInnerProps;
  }
}

export const ZFormFieldWrapper = defineComponent(
  (_props: TypeControllerFormFieldWrapperPublicProps) => {
    useController(ControllerFormFieldWrapper, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(ControllerFormFieldWrapper.$componentOptions),
);
