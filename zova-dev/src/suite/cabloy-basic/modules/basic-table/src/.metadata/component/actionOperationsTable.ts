import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';

import { ControllerActionOperationsTable } from '../../component/actionOperationsTable/controller.jsx';

export interface TypeControllerActionOperationsTablePublicProps {
  controllerRef?: (ref: ControllerActionOperationsTable) => void;
}

export const ZActionOperationsTable = defineComponent((_props: TypeControllerActionOperationsTablePublicProps) => {
  useController(ControllerActionOperationsTable, undefined, undefined);
  return () => {};
}, prepareComponentOptions());
