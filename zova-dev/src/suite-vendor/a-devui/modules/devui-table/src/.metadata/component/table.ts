import type { TypeControllerInnerProps } from 'zova';
import type { ControllerTableProps } from '../../component/table/controller.jsx';
import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerTable } from '../../component/table/controller.jsx';
import { RenderTable } from '../../component/table/render.jsx';

export type TypeControllerTablePublicProps<T extends {} = {}> = {
  controllerRef?: (ref: ControllerTable<T>) => void;
} & ControllerTableProps<T>;

type ControllerInnerProps<T extends {} = {}> =
  TypeControllerInnerProps<ControllerTableProps<T>, keyof typeof ControllerTable.$propsDefault>;
declare module 'zova-module-devui-table' {
  export interface ControllerTable<T extends {} = {}> {
    $props: ControllerInnerProps<T>;
  }
}
declare module 'zova-module-devui-table' {
  export interface RenderTable<T extends {} = {}> extends ControllerTable<T> {}
}
export const ZTable = defineComponent(
  <T extends {} = {}>(_props: TypeControllerTablePublicProps<T>) => {
    useController(ControllerTable, RenderTable, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
