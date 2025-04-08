import type { ControllerCardProps } from '../../component/card/controller.jsx';
import { defineComponent } from 'vue';
import { useController } from 'zova';
import { ControllerCard } from '../../component/card/controller.jsx';

export const ZCard = defineComponent(
  (_props: ControllerCardProps) => {
    useController(ControllerCard, undefined, undefined);
    return () => {
      return null;
    };
  },
);
