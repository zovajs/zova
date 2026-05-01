import type { TypeControllerInnerProps } from 'zova';

import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';

import type { ControllerActionOperationsBulkProps } from '../../component/actionOperationsBulk/controller.jsx';

import { ControllerActionOperationsBulk } from '../../component/actionOperationsBulk/controller.jsx';
export type TypeControllerActionOperationsBulkPublicProps = {
  controllerRef?: (ref: ControllerActionOperationsBulk) => void;
} & ControllerActionOperationsBulkProps;

type ControllerInnerProps = TypeControllerInnerProps<
  ControllerActionOperationsBulkProps,
  keyof typeof ControllerActionOperationsBulk.$propsDefault
>;
declare module 'zova-module-basic-table' {
  export interface ControllerActionOperationsBulk {
    $props: ControllerInnerProps;
  }
}

export const ZActionOperationsBulk = defineComponent(
  (_props: TypeControllerActionOperationsBulkPublicProps) => {
    useController(ControllerActionOperationsBulk, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(ControllerActionOperationsBulk.$componentOptions),
);
