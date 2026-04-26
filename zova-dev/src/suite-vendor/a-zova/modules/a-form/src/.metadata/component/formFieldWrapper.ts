import type { TypeControllerInnerProps } from 'zova';

import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';

import type { ControllerFormFieldWrapperProps } from '../../component/formFieldWrapper/controller.jsx';

import { ControllerFormFieldWrapper } from '../../component/formFieldWrapper/controller.jsx';
export type TypeControllerFormFieldWrapperPublicProps<
  TParentData extends {} = {},
  TSubmitMeta = never,
> = {
  controllerRef?: (ref: ControllerFormFieldWrapper<TParentData, TSubmitMeta>) => void;
} & ControllerFormFieldWrapperProps<TParentData, TSubmitMeta>;

type ControllerInnerProps<
  TParentData extends {} = {},
  TSubmitMeta = never,
> = TypeControllerInnerProps<
  ControllerFormFieldWrapperProps<TParentData, TSubmitMeta>,
  keyof typeof ControllerFormFieldWrapper.$propsDefault
>;
declare module 'zova-module-a-form' {
  export interface ControllerFormFieldWrapper<TParentData extends {} = {}, TSubmitMeta = never> {
    $props: ControllerInnerProps<TParentData, TSubmitMeta>;
  }
}

export const ZFormFieldWrapper = defineComponent(
  <TParentData extends {} = {}, TSubmitMeta = never>(
    _props: TypeControllerFormFieldWrapperPublicProps<TParentData, TSubmitMeta>,
  ) => {
    useController(ControllerFormFieldWrapper, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(ControllerFormFieldWrapper.$componentOptions),
);
