import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerRestPage } from '../../component/restPage/controller.jsx';

export interface TypeControllerRestPagePublicProps {
  controllerRef?: (ref: ControllerRestPage) => void;
}

export const ZRestPage = defineComponent(
  (_props: TypeControllerRestPagePublicProps) => {
    useController(ControllerRestPage, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
