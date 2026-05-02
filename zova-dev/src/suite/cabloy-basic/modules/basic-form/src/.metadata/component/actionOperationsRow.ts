import type { TypeControllerInnerProps } from 'zova';

import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';

import type { ControllerActionOperationsRowProps } from '../../component/actionOperationsRow/controller.jsx';

import { ControllerActionOperationsRow } from '../../component/actionOperationsRow/controller.jsx';
export type TypeControllerActionOperationsRowPublicProps = {
  controllerRef?: (ref: ControllerActionOperationsRow) => void;
} & ControllerActionOperationsRowProps;

type ControllerInnerProps = TypeControllerInnerProps<
  ControllerActionOperationsRowProps,
  keyof typeof ControllerActionOperationsRow.$propsDefault
>;
declare module 'zova-module-basic-form' {
  export interface ControllerActionOperationsRow {
    $props: ControllerInnerProps;
  }
}

export const ZActionOperationsRow = defineComponent(
  (_props: TypeControllerActionOperationsRowPublicProps) => {
    useController(ControllerActionOperationsRow, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(ControllerActionOperationsRow.$componentOptions),
);
