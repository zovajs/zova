import type { TypeControllerInnerProps } from 'zova';
import type { ControllerTableProps } from '../../component/table/controller.jsx';
import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerTable } from '../../component/table/controller.jsx';
import { RenderTable } from '../../component/table/render.jsx';

export type TypeControllerTablePublicProps<T extends any[] = any[]> = {
  controllerRef?: (ref: ControllerTable<T>) => void;
} & ControllerTableProps<T>;

type ControllerInnerProps<T extends any[] = any[]> =
      TypeControllerInnerProps<ControllerTableProps<T>, keyof typeof ControllerTable.$propsDefault>;
declare module 'zova-module-devui-table' {
  export interface ControllerTable<T extends any[] = any[]> {
    $props: ControllerInnerProps<T>;
  }
}
declare module 'zova-module-devui-table' {
  export interface RenderTable<T extends any[] = any[]> extends ControllerTable<T> {}
}
export const ZTable = defineComponent(
  <T extends any[] = any[]>(_props: TypeControllerTablePublicProps<T>) => {
    useController(ControllerTable, RenderTable, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
