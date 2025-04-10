import type { TypeControllerInnerProps } from 'zova';
import type { ControllerBehaviorProps } from '../../component/behavior/controller.jsx';
import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerBehavior } from '../../component/behavior/controller.jsx';

export type TypeControllerBehaviorPublicProps = {
  controllerRef?: (ref: ControllerBehavior) => void;
} & ControllerBehaviorProps;

type ControllerInnerProps =
      TypeControllerInnerProps<ControllerBehaviorProps, keyof typeof ControllerBehavior.$propsDefault>;
declare module 'zova-module-a-behavior' {
  export interface ControllerBehavior {
    $props: ControllerInnerProps;
  }

}
export const ZBehavior = defineComponent(
  (_props: TypeControllerBehaviorPublicProps) => {
    useController(ControllerBehavior, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(ControllerBehavior.$componentOptions),
);
