import type { ControllerLayoutEmptyProps } from '../../component/layoutEmpty/controller.jsx';
import { defineComponent } from 'vue';
import { useController } from 'zova';
import { ControllerLayoutEmpty } from '../../component/layoutEmpty/controller.jsx';

export const ZLayoutEmpty = defineComponent(
  (_props: ControllerLayoutEmptyProps) => {
    useController(ControllerLayoutEmpty, undefined, undefined);
    return () => {
      return null;
    };
  },
);
