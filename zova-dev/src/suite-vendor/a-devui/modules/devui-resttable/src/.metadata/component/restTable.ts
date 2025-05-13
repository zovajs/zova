import type { TypeControllerInnerProps } from 'zova';
import type { ControllerRestTableProps } from '../../component/restTable/controller.jsx';
import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerRestTable } from '../../component/restTable/controller.jsx';
import { RenderRestTable } from '../../component/restTable/render.jsx';

export type TypeControllerRestTablePublicProps<_T = unknown> = {
  controllerRef?: (ref: ControllerRestTable<_T>) => void;
} & ControllerRestTableProps<_T>;

type ControllerInnerProps<_T = unknown> =
      TypeControllerInnerProps<ControllerRestTableProps<_T>, keyof typeof ControllerRestTable.$propsDefault>;
declare module 'zova-module-devui-resttable' {
  export interface ControllerRestTable<_T = unknown> {
    $props: ControllerInnerProps<_T>;
  }
}
declare module 'zova-module-devui-resttable' {
  export interface RenderRestTable<_T = unknown> extends ControllerRestTable<_T> {}
}
export const ZRestTable = defineComponent(
  <_T = unknown>(_props: TypeControllerRestTablePublicProps<_T>) => {
    useController(ControllerRestTable, RenderRestTable, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
