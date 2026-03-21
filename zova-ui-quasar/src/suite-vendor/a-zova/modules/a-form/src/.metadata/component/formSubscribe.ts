import type { TypeControllerInnerProps } from 'zova';

import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';

import type { ControllerFormSubscribeProps } from '../../component/formSubscribe/controller.jsx';

import { ControllerFormSubscribe } from '../../component/formSubscribe/controller.jsx';

export type TypeControllerFormSubscribePublicProps<TFormData extends {} = {}, TSubmitMeta = never> = {
  controllerRef?: (ref: ControllerFormSubscribe<TFormData, TSubmitMeta>) => void;
} & ControllerFormSubscribeProps<TFormData, TSubmitMeta>;

type ControllerInnerProps<TFormData extends {} = {}, TSubmitMeta = never> = TypeControllerInnerProps<
  ControllerFormSubscribeProps<TFormData, TSubmitMeta>,
  keyof typeof ControllerFormSubscribe.$propsDefault
>;
declare module 'zova-module-a-form' {
  export interface ControllerFormSubscribe<TFormData extends {} = {}, TSubmitMeta = never> {
    $props: ControllerInnerProps<TFormData, TSubmitMeta>;
  }
}

export const ZFormSubscribe = defineComponent(
  <TFormData extends {} = {}, TSubmitMeta = never>(_props: TypeControllerFormSubscribePublicProps<TFormData, TSubmitMeta>) => {
    useController(ControllerFormSubscribe, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
