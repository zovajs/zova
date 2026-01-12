import type { TypeControllerInnerProps } from 'zova';
import type { ControllerWrapperFormProps } from '../../component/wrapperForm/controller.jsx';
import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerWrapperForm } from '../../component/wrapperForm/controller.jsx';

export type TypeControllerWrapperFormPublicProps = {
  controllerRef?: (ref: ControllerWrapperForm) => void;
} & ControllerWrapperFormProps;

type ControllerInnerProps =
  TypeControllerInnerProps<ControllerWrapperFormProps, keyof typeof ControllerWrapperForm.$propsDefault>;
declare module 'zova-module-devui-restpageentry' {
  export interface ControllerWrapperForm {
    $props: ControllerInnerProps;
  }
}

export const ZWrapperForm = defineComponent(
  (_props: TypeControllerWrapperFormPublicProps) => {
    useController(ControllerWrapperForm, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
