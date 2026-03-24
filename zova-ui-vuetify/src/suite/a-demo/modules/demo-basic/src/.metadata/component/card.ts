import type { TypeControllerInnerProps } from 'zova';

import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';

import type { ControllerCardProps } from '../../component/card/controller.jsx';

import { ControllerCard } from '../../component/card/controller.jsx';
export type TypeControllerCardPublicProps = {
  controllerRef?: (ref: ControllerCard) => void;
} & ControllerCardProps;

type ControllerInnerProps = TypeControllerInnerProps<ControllerCardProps, keyof typeof ControllerCard.$propsDefault>;
declare module 'zova-module-demo-basic' {
  export interface ControllerCard {
    $props: ControllerInnerProps;
  }
}

export const ZCard = defineComponent((_props: TypeControllerCardPublicProps) => {
  useController(ControllerCard, undefined, undefined);
  return () => {};
}, prepareComponentOptions());
