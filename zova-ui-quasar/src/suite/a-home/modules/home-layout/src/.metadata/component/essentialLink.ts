import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerEssentialLink } from '../../component/essentialLink/controller.jsx';
import { RenderEssentialLink } from '../../component/essentialLink/render.jsx';

export interface TypeControllerEssentialLinkPublicProps {
  controllerRef?: (ref: ControllerEssentialLink) => void;
}

declare module 'zova-module-home-layout' {
  export interface RenderEssentialLink extends ControllerEssentialLink {}
}
export const ZEssentialLink = defineComponent(
  (_props: TypeControllerEssentialLinkPublicProps) => {
    useController(ControllerEssentialLink, RenderEssentialLink, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
