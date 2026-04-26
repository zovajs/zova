import type { TypeControllerInnerProps } from 'zova';

import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';

import type { ControllerFormFieldWrapperProps } from '../../component/formFieldWrapper/controller.jsx';

import { ControllerFormFieldWrapper } from '../../component/formFieldWrapper/controller.jsx';
export type TypeControllerFormFieldWrapperPublicProps<TParentData extends {} = {}> = {
  controllerRef?: (ref: ControllerFormFieldWrapper<TParentData>) => void;
} & ControllerFormFieldWrapperProps<TParentData>;

type ControllerInnerProps<TParentData extends {} = {}> = TypeControllerInnerProps<
  ControllerFormFieldWrapperProps<TParentData>,
  keyof typeof ControllerFormFieldWrapper.$propsDefault
>;
declare module 'zova-module-a-form' {
  export interface ControllerFormFieldWrapper<TParentData extends {} = {}> {
    $props: ControllerInnerProps<TParentData>;
  }
}

export const ZFormFieldWrapper = defineComponent(
  <TParentData extends {} = {}>(_props: TypeControllerFormFieldWrapperPublicProps<TParentData>) => {
    useController(ControllerFormFieldWrapper, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(ControllerFormFieldWrapper.$componentOptions),
);
