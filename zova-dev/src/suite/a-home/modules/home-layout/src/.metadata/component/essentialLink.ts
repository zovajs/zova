import type { TypeControllerInnerProps } from 'zova';
import type { ControllerEssentialLinkProps } from '../../component/essentialLink/controller.jsx';
import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerEssentialLink } from '../../component/essentialLink/controller.jsx';

export type TypeControllerEssentialLinkPublicProps = {
  controllerRef?: (ref: ControllerEssentialLink) => void;
} & ControllerEssentialLinkProps;

type ControllerInnerProps =
      TypeControllerInnerProps<ControllerEssentialLinkProps, keyof typeof ControllerEssentialLink.$propsDefault>;
declare module 'zova-module-home-layout' {
  export interface ControllerEssentialLink {
    $props: ControllerInnerProps;
  }

}
export const ZEssentialLink = defineComponent(
  (_props: TypeControllerEssentialLinkPublicProps) => {
    useController(ControllerEssentialLink, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
