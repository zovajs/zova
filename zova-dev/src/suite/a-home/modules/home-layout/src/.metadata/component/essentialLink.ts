import type { RequiredSome } from 'zova';
import type { ControllerEssentialLinkProps } from '../../component/essentialLink/controller.jsx';
import { defineComponent } from 'vue';
import { useController } from 'zova';
import { ControllerEssentialLink } from '../../component/essentialLink/controller.jsx';

declare module 'zova-module-home-layout' {

  export interface ControllerEssentialLinkProps {
    controllerRef?: (ref: ControllerEssentialLink) => void;
  }

  export interface ControllerEssentialLink {
    $props: RequiredSome<ControllerEssentialLinkProps, keyof typeof ControllerEssentialLink.$propsDefault>;
  }
}

export const ZEssentialLink = defineComponent(
  (_props: ControllerEssentialLinkProps) => {
    useController(ControllerEssentialLink, undefined, undefined);
    return () => {
      return null;
    };
  },
);
