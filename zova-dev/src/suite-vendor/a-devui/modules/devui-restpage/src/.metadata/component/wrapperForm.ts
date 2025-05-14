import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerWrapperForm } from '../../component/wrapperForm/controller.jsx';

export interface TypeControllerWrapperFormPublicProps {
  controllerRef?: (ref: ControllerWrapperForm) => void;
}

export const ZWrapperForm = defineComponent(
  (_props: TypeControllerWrapperFormPublicProps) => {
    useController(ControllerWrapperForm, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
