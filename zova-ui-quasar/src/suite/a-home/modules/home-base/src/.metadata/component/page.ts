import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerPage } from '../../component/page/controller.jsx';
import { RenderPage } from '../../component/page/render.jsx';
import { StylePage } from '../../component/page/style.js';

export interface TypeControllerPagePublicProps {
  controllerRef?: (ref: ControllerPage) => void;
}

declare module 'zova-module-home-base' {
  export interface StylePage extends ControllerPage {}
  export interface RenderPage extends StylePage {}
}
export const ZPage = defineComponent(
  (_props: TypeControllerPagePublicProps) => {
    useController(ControllerPage, RenderPage, StylePage);
    return () => {};
  },
  prepareComponentOptions(),
);
