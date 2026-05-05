import type { TypeControllerInnerProps } from 'zova';

import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';

import type { ControllerToolbarBulkProps } from '../../component/toolbarBulk/controller.jsx';

import { ControllerToolbarBulk } from '../../component/toolbarBulk/controller.jsx';
export type TypeControllerToolbarBulkPublicProps = {
  controllerRef?: (ref: ControllerToolbarBulk) => void;
} & ControllerToolbarBulkProps;

type ControllerInnerProps = TypeControllerInnerProps<
  ControllerToolbarBulkProps,
  keyof typeof ControllerToolbarBulk.$propsDefault
>;
declare module 'zova-module-basic-page' {
  export interface ControllerToolbarBulk {
    $props: ControllerInnerProps;
  }
}

export const ZToolbarBulk = defineComponent((_props: TypeControllerToolbarBulkPublicProps) => {
  useController(ControllerToolbarBulk, undefined, undefined);
  return () => {};
}, prepareComponentOptions(ControllerToolbarBulk.$componentOptions));
