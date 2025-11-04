import type { TypeControllerInnerProps } from 'zova';
import type { ControllerFormSubscribeProps } from '../../component/formSubscribe/controller.jsx';
import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerFormSubscribe } from '../../component/formSubscribe/controller.jsx';

export type TypeControllerFormSubscribePublicProps<_T = unknown> = {
  controllerRef?: (ref: ControllerFormSubscribe<_T>) => void;
} & ControllerFormSubscribeProps<_T>;

type ControllerInnerProps<_T = unknown> =
  TypeControllerInnerProps<ControllerFormSubscribeProps<_T>, keyof typeof ControllerFormSubscribe.$propsDefault>;
declare module 'zova-module-a-form' {
  export interface ControllerFormSubscribe<_T = unknown> {
    $props: ControllerInnerProps<_T>;
  }
}

export const ZFormSubscribe = defineComponent(
  <_T = unknown>(_props: TypeControllerFormSubscribePublicProps<_T>) => {
    useController(ControllerFormSubscribe, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
