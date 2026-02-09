import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerLayoutEmpty } from '../../component/layoutEmpty/controller.jsx';
import { RenderLayoutEmpty } from '../../component/layoutEmpty/render.jsx';

export interface TypeControllerLayoutEmptyPublicProps {
  controllerRef?: (ref: ControllerLayoutEmpty) => void;
}

declare module 'zova-module-home-layout' {
  export interface RenderLayoutEmpty extends ControllerLayoutEmpty {}
}
export const ZLayoutEmpty = defineComponent(
  (_props: TypeControllerLayoutEmptyPublicProps) => {
    useController(ControllerLayoutEmpty, RenderLayoutEmpty, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
