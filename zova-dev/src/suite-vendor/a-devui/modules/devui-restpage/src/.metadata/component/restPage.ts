import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerRestPage } from '../../component/restPage/controller.jsx';
import { RenderRestPage } from '../../component/restPage/render.jsx';

export interface TypeControllerRestPagePublicProps {
  controllerRef?: (ref: ControllerRestPage) => void;
}

declare module 'zova-module-devui-restpage' {
  export interface RenderRestPage extends ControllerRestPage {}
}
export const ZRestPage = defineComponent(
  (_props: TypeControllerRestPagePublicProps) => {
    useController(ControllerRestPage, RenderRestPage, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
