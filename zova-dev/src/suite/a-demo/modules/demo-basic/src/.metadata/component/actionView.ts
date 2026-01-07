import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerActionView } from '../../component/actionView/controller.jsx';

export interface TypeControllerActionViewPublicProps {
  controllerRef?: (ref: ControllerActionView) => void;
}

export const ZActionView = defineComponent(
  (_props: TypeControllerActionViewPublicProps) => {
    useController(ControllerActionView, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
