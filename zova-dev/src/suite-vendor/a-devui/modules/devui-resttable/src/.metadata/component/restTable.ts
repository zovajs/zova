import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerRestTable } from '../../component/restTable/controller.jsx';

export interface TypeControllerRestTablePublicProps {
  controllerRef?: (ref: ControllerRestTable) => void;
}

export const ZRestTable = defineComponent(
  (_props: TypeControllerRestTablePublicProps) => {
    useController(ControllerRestTable, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
