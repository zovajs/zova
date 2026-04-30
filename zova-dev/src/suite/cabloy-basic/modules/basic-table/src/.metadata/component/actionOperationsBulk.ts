import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';

import { ControllerActionOperationsBulk } from '../../component/actionOperationsBulk/controller.jsx';
export type TypeControllerActionOperationsBulkPublicProps = {
  controllerRef?: (ref: ControllerActionOperationsBulk) => void;
};

export const ZActionOperationsBulk = defineComponent(
  (_props: TypeControllerActionOperationsBulkPublicProps) => {
    useController(ControllerActionOperationsBulk, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
