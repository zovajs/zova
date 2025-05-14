import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerWrapperForm } from '../../component/wrapperForm/controller.jsx';
import { RenderWrapperForm } from '../../component/wrapperForm/render.jsx';

export interface TypeControllerWrapperFormPublicProps {
  controllerRef?: (ref: ControllerWrapperForm) => void;
}

declare module 'zova-module-devui-restpage' {
  export interface RenderWrapperForm extends ControllerWrapperForm {}
}
export const ZWrapperForm = defineComponent(
  (_props: TypeControllerWrapperFormPublicProps) => {
    useController(ControllerWrapperForm, RenderWrapperForm, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
