import type { TypeControllerInnerProps } from 'zova';
import type { ControllerFormSubscribeProps } from '../../component/formSubscribe/controller.jsx';
import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerFormSubscribe } from '../../component/formSubscribe/controller.jsx';

export type TypeControllerFormSubscribePublicProps<T extends {} = {}> = {
  controllerRef?: (ref: ControllerFormSubscribe<T>) => void;
} & ControllerFormSubscribeProps<T>;

type ControllerInnerProps<T extends {} = {}> =
  TypeControllerInnerProps<ControllerFormSubscribeProps<T>, keyof typeof ControllerFormSubscribe.$propsDefault>;
declare module 'zova-module-a-form' {
  export interface ControllerFormSubscribe<T extends {} = {}> {
    $props: ControllerInnerProps<T>;
  }
}

export const ZFormSubscribe = defineComponent(
  <T extends {} = {}>(_props: TypeControllerFormSubscribePublicProps<T>) => {
    useController(ControllerFormSubscribe, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
