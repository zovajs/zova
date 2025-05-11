import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerForm } from '../../component/form/controller.jsx';

export interface TypeControllerFormPublicProps {
  controllerRef?: (ref: ControllerForm) => void;
}

export const ZForm = defineComponent(
  (_props: TypeControllerFormPublicProps) => {
    useController(ControllerForm, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
