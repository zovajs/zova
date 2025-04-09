import type { RequiredSome } from 'zova';
import type { ControllerCardProps } from '../../component/card/controller.jsx';
import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerCard } from '../../component/card/controller.jsx';

declare module 'zova-module-demo-basic' {

  export interface ControllerCardProps {
    controllerRef?: (ref: ControllerCard) => void;
  }

  export interface ControllerCard {
    $props: RequiredSome<ControllerCardProps, keyof typeof ControllerCard.$propsDefault>;
  }
}

export const ZCard = defineComponent(
  (_props: ControllerCardProps) => {
    useController(ControllerCard, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
