import type { RequiredSome } from 'zova';
import type { ControllerBehaviorProps } from '../../component/behavior/controller.jsx';
import { defineComponent } from 'vue';
import { useController } from 'zova';
import { ControllerBehavior } from '../../component/behavior/controller.jsx';

declare module 'zova-module-a-behavior' {

  export interface ControllerBehaviorProps {
    controllerRef?: (ref: ControllerBehavior) => void;
  }

  export interface ControllerBehavior {
    $props: RequiredSome<ControllerBehaviorProps, keyof typeof ControllerBehavior.$propsDefault>;
  }
}

export const ZBehavior = defineComponent(
  (_props: ControllerBehaviorProps) => {
    useController(ControllerBehavior, undefined, undefined);
    return () => {
      return null;
    };
  },
  ControllerBehavior.$componentOptions,
);
