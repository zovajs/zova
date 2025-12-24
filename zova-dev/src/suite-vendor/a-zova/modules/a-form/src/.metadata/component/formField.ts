import type { TypeControllerInnerProps } from 'zova';
import type { ControllerFormFieldProps } from '../../component/formField/controller.jsx';
import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerFormField } from '../../component/formField/controller.jsx';

export type TypeControllerFormFieldPublicProps<TParentData extends {} = {}> = {
  controllerRef?: (ref: ControllerFormField<TParentData>) => void;
} & ControllerFormFieldProps<TParentData>;

type ControllerInnerProps<TParentData extends {} = {}> =
      TypeControllerInnerProps<ControllerFormFieldProps<TParentData>, keyof typeof ControllerFormField.$propsDefault>;
declare module 'zova-module-a-form' {
  export interface ControllerFormField<TParentData extends {} = {}> {
    $props: ControllerInnerProps<TParentData>;
  }
}

export const ZFormField = defineComponent(
  <TParentData extends {} = {}> (_props: TypeControllerFormFieldPublicProps<TParentData>) => {
    useController(ControllerFormField, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(ControllerFormField.$componentOptions),
);
