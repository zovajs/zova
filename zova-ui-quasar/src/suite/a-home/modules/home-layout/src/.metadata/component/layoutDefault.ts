import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerLayoutDefault } from '../../component/layoutDefault/controller.jsx';
import { RenderLayoutDefault } from '../../component/layoutDefault/render.jsx';

export interface TypeControllerLayoutDefaultPublicProps {
  controllerRef?: (ref: ControllerLayoutDefault) => void;
}

declare module 'zova-module-home-layout' {
  export interface RenderLayoutDefault extends ControllerLayoutDefault {}
}
export const ZLayoutDefault = defineComponent(
  (_props: TypeControllerLayoutDefaultPublicProps) => {
    useController(ControllerLayoutDefault, RenderLayoutDefault, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
