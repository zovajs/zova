import type { TypeControllerInnerProps } from 'zova';
import type { ControllerTableProps } from '../../component/table/controller.jsx';
import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerTable } from '../../component/table/controller.jsx';
import { RenderTable } from '../../component/table/render.jsx';

export type TypeControllerTablePublicProps<TData extends unknown | object | any[] = unknown | object | any[]> = {
  controllerRef?: (ref: ControllerTable<TData>) => void;
} & ControllerTableProps<TData>;

type ControllerInnerProps<TData extends unknown | object | any[] = unknown | object | any[]> =
  TypeControllerInnerProps<ControllerTableProps<TData>, keyof typeof ControllerTable.$propsDefault>;
declare module 'zova-module-devui-table' {
  export interface ControllerTable<TData extends unknown | object | any[] = unknown | object | any[]> {
    $props: ControllerInnerProps<TData>;
  }
}
declare module 'zova-module-devui-table' {
  export interface RenderTable<TData extends unknown | object | any[] = unknown | object | any[]> extends ControllerTable<TData> {}
}
export const ZTable = defineComponent(
  <TData extends unknown | object | any[] = unknown | object | any[]>(_props: TypeControllerTablePublicProps<TData>) => {
    useController(ControllerTable, RenderTable, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
