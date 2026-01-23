import type { TypeControllerInnerProps } from 'zova';
import type { ControllerWrapperTableProps } from '../../component/wrapperTable/controller.jsx';
import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerWrapperTable } from '../../component/wrapperTable/controller.jsx';
import { RenderWrapperTable } from '../../component/wrapperTable/render.jsx';

export type TypeControllerWrapperTablePublicProps<TData extends {} = {}> = {
  controllerRef?: (ref: ControllerWrapperTable<TData>) => void;
} & ControllerWrapperTableProps<TData>;

type ControllerInnerProps<TData extends {} = {}> =
  TypeControllerInnerProps<ControllerWrapperTableProps<TData>, keyof typeof ControllerWrapperTable.$propsDefault>;
declare module 'zova-module-devui-restpage' {
  export interface ControllerWrapperTable<TData extends {} = {}> {
    $props: ControllerInnerProps<TData>;
  }
}
declare module 'zova-module-devui-restpage' {
  export interface RenderWrapperTable<TData extends {} = {}> extends ControllerWrapperTable<TData> {}
  export interface RenderCreate<TData extends {} = {}> extends ControllerWrapperTable<TData> {}
  export interface RenderPaged<TData extends {} = {}> extends ControllerWrapperTable<TData> {}
  export interface RenderTable<TData extends {} = {}> extends ControllerWrapperTable<TData> {}
}
export const ZWrapperTable = defineComponent(
  <TData extends {} = {}>(_props: TypeControllerWrapperTablePublicProps<TData>) => {
    useController(ControllerWrapperTable, RenderWrapperTable, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
