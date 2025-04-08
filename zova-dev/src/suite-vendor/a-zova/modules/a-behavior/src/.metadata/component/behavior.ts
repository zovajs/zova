import type { ControllerBehaviorProps } from '../../component/behavior/controller.jsx';
import { defineComponent } from 'vue';
import { useController } from 'zova';
import { ControllerBehavior } from '../../component/behavior/controller.jsx';

export const ZBehavior = defineComponent(
  (_props: ControllerBehaviorProps) => {
    useController(ControllerBehavior, undefined, undefined);
    return () => {
      return null;
    };
  },
  ControllerBehavior.$componentOptions,
);
