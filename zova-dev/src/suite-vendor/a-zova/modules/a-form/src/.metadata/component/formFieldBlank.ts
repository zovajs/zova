import type { TypeControllerInnerProps } from 'zova';

import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';

import type { ControllerFormFieldBlankProps } from '../../component/formFieldBlank/controller.jsx';

import { ControllerFormFieldBlank } from '../../component/formFieldBlank/controller.jsx';
export type TypeControllerFormFieldBlankPublicProps<
  TParentData extends {} = {},
  TSubmitMeta = never,
> = {
  controllerRef?: (ref: ControllerFormFieldBlank<TParentData, TSubmitMeta>) => void;
} & ControllerFormFieldBlankProps<TParentData, TSubmitMeta>;

type ControllerInnerProps<
  TParentData extends {} = {},
  TSubmitMeta = never,
> = TypeControllerInnerProps<
  ControllerFormFieldBlankProps<TParentData, TSubmitMeta>,
  keyof typeof ControllerFormFieldBlank.$propsDefault
>;
declare module 'zova-module-a-form' {
  export interface ControllerFormFieldBlank<TParentData extends {} = {}, TSubmitMeta = never> {
    $props: ControllerInnerProps<TParentData, TSubmitMeta>;
  }
}

export const ZFormFieldBlank = defineComponent(
  <TParentData extends {} = {}, TSubmitMeta = never>(
    _props: TypeControllerFormFieldBlankPublicProps<TParentData, TSubmitMeta>,
  ) => {
    useController(ControllerFormFieldBlank, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(ControllerFormFieldBlank.$componentOptions),
);
