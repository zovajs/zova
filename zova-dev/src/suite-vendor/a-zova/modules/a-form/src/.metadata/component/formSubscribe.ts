import type { TypeControllerInnerProps } from 'zova';
import type { ControllerFormSubscribeProps } from '../../component/formSubscribe/controller.jsx';
import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerFormSubscribe } from '../../component/formSubscribe/controller.jsx';

export type TypeControllerFormSubscribePublicProps = {
  controllerRef?: (ref: ControllerFormSubscribe) => void;
} & ControllerFormSubscribeProps;

type ControllerInnerProps =
  TypeControllerInnerProps<ControllerFormSubscribeProps, keyof typeof ControllerFormSubscribe.$propsDefault>;
declare module 'zova-module-a-form' {
  export interface ControllerFormSubscribe {
    $props: ControllerInnerProps;
  }
}

export const ZFormSubscribe = defineComponent(
  (_props: TypeControllerFormSubscribePublicProps) => {
    useController(ControllerFormSubscribe, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
