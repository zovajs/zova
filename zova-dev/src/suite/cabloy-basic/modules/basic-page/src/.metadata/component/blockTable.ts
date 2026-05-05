import type { TypeControllerInnerProps } from 'zova';

import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';

import type { ControllerBlockTableProps } from '../../component/blockTable/controller.jsx';

import { ControllerBlockTable } from '../../component/blockTable/controller.jsx';
export type TypeControllerBlockTablePublicProps = {
  controllerRef?: (ref: ControllerBlockTable) => void;
} & ControllerBlockTableProps;

type ControllerInnerProps = TypeControllerInnerProps<
  ControllerBlockTableProps,
  keyof typeof ControllerBlockTable.$propsDefault
>;
declare module 'zova-module-basic-page' {
  export interface ControllerBlockTable {
    $props: ControllerInnerProps;
  }
}

export const ZBlockTable = defineComponent((_props: TypeControllerBlockTablePublicProps) => {
  useController(ControllerBlockTable, undefined, undefined);
  return () => {};
}, prepareComponentOptions(ControllerBlockTable.$componentOptions));
