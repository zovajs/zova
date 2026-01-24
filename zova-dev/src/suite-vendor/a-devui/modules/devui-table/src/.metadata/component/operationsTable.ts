import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerOperationsTable } from '../../component/operationsTable/controller.jsx';

export interface TypeControllerOperationsTablePublicProps {
  controllerRef?: (ref: ControllerOperationsTable) => void;
}

export const ZOperationsTable = defineComponent(
  (_props: TypeControllerOperationsTablePublicProps) => {
    useController(ControllerOperationsTable, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
