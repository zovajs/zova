import type { ControllerEssentialLinkProps } from '../../component/essentialLink/controller.jsx';
import { defineComponent } from 'vue';
import { useController } from 'zova';
import { ControllerEssentialLink } from '../../component/essentialLink/controller.jsx';

export const ZEssentialLink = defineComponent(
  (_props: ControllerEssentialLinkProps) => {
    useController(ControllerEssentialLink, undefined, undefined);
    return () => {
      return null;
    };
  },
);
