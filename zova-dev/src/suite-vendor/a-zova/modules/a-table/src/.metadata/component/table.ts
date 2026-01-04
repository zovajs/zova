import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerTable } from '../../component/table/controller.jsx';

export interface TypeControllerTablePublicProps {
  controllerRef?: (ref: ControllerTable) => void;
}

export const ZTable = defineComponent(
  (_props: TypeControllerTablePublicProps) => {
    useController(ControllerTable, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
