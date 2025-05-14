import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerRestForm } from '../../component/restForm/controller.jsx';
import { RenderRestForm } from '../../component/restForm/render.jsx';

export interface TypeControllerRestFormPublicProps {
  controllerRef?: (ref: ControllerRestForm) => void;
}

declare module 'zova-module-devui-restform' {
  export interface RenderRestForm extends ControllerRestForm {}
}
export const ZRestForm = defineComponent(
  (_props: TypeControllerRestFormPublicProps) => {
    useController(ControllerRestForm, RenderRestForm, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
