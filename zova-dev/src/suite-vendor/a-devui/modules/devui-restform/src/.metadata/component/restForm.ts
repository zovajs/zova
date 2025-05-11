import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerRestForm } from '../../component/restForm/controller.jsx';

export interface TypeControllerRestFormPublicProps {
  controllerRef?: (ref: ControllerRestForm) => void;
}

export const ZRestForm = defineComponent(
  (_props: TypeControllerRestFormPublicProps) => {
    useController(ControllerRestForm, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
