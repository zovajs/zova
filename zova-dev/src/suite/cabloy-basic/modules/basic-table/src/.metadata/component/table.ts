import type { TypeControllerInnerProps } from 'zova';

import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';

import type { ControllerTableProps } from '../../component/table/controller.jsx';

import { ControllerTable } from '../../component/table/controller.jsx';
import { RenderTable } from '../../component/table/render.jsx';
export type TypeControllerTablePublicProps = {
  controllerRef?: (ref: ControllerTable) => void;
} & ControllerTableProps;

type ControllerInnerProps = TypeControllerInnerProps<
  ControllerTableProps,
  keyof typeof ControllerTable.$propsDefault
>;
declare module 'zova-module-basic-table' {
  export interface ControllerTable {
    $props: ControllerInnerProps;
  }
}
declare module 'zova-module-basic-table' {
  export interface RenderTable extends ControllerTable {}
}
export const ZTable = defineComponent((_props: TypeControllerTablePublicProps) => {
  useController(ControllerTable, RenderTable, undefined);
  return () => {};
}, prepareComponentOptions());
