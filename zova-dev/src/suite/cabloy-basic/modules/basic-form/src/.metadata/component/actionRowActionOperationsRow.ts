import type { TypeControllerInnerProps } from 'zova';

import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';

import type { ControllerActionRowActionOperationsRowProps } from '../../component/actionRowActionOperationsRow/controller.jsx';

import { ControllerActionRowActionOperationsRow } from '../../component/actionRowActionOperationsRow/controller.jsx';
export type TypeControllerActionRowActionOperationsRowPublicProps = {
  controllerRef?: (ref: ControllerActionRowActionOperationsRow) => void;
} & ControllerActionRowActionOperationsRowProps;

type ControllerInnerProps = TypeControllerInnerProps<
  ControllerActionRowActionOperationsRowProps,
  keyof typeof ControllerActionRowActionOperationsRow.$propsDefault
>;
declare module 'zova-module-basic-form' {
  export interface ControllerActionRowActionOperationsRow {
    $props: ControllerInnerProps;
  }
}

export const ZActionRowActionOperationsRow = defineComponent(
  (_props: TypeControllerActionRowActionOperationsRowPublicProps) => {
    useController(ControllerActionRowActionOperationsRow, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(ControllerActionRowActionOperationsRow.$componentOptions),
);
