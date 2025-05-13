import type { TypeControllerInnerProps } from 'zova';
import type { ControllerRestTableProps } from '../../component/restTable/controller.jsx';
import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerRestTable } from '../../component/restTable/controller.jsx';
import { RenderRestTable } from '../../component/restTable/render.jsx';

export type TypeControllerRestTablePublicProps<T extends any[] = any[]> = {
  controllerRef?: (ref: ControllerRestTable<T>) => void;
} & ControllerRestTableProps<T>;

type ControllerInnerProps<T extends any[] = any[]> =
      TypeControllerInnerProps<ControllerRestTableProps<T>, keyof typeof ControllerRestTable.$propsDefault>;
declare module 'zova-module-devui-resttable' {
  export interface ControllerRestTable<T extends any[] = any[]> {
    $props: ControllerInnerProps<T>;
  }
}
declare module 'zova-module-devui-resttable' {
  export interface RenderRestTable<T extends any[] = any[]> extends ControllerRestTable<T> {}
}
export const ZRestTable = defineComponent(
  <T extends any[] = any[]>(_props: TypeControllerRestTablePublicProps<T>) => {
    useController(ControllerRestTable, RenderRestTable, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
