import type { TypeControllerInnerProps } from 'zova';
import type { ControllerWrapperFormProps } from '../../component/wrapperForm/controller.jsx';
import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerWrapperForm } from '../../component/wrapperForm/controller.jsx';
import { RenderWrapperForm } from '../../component/wrapperForm/render.jsx';

export type TypeControllerWrapperFormPublicProps = {
  controllerRef?: (ref: ControllerWrapperForm) => void;
} & ControllerWrapperFormProps;

type ControllerInnerProps =
  TypeControllerInnerProps<ControllerWrapperFormProps, keyof typeof ControllerWrapperForm.$propsDefault>;
declare module 'zova-module-devui-restpage' {
  export interface ControllerWrapperForm {
    $props: ControllerInnerProps;
  }
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
