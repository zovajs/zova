import type { TypeControllerInnerProps } from 'zova';
import type { ControllerWrapperTableProps } from '../../component/wrapperTable/controller.jsx';
import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerWrapperTable } from '../../component/wrapperTable/controller.jsx';
import { RenderWrapperTable } from '../../component/wrapperTable/render.jsx';

export type TypeControllerWrapperTablePublicProps<T extends {} = {}> = {
  controllerRef?: (ref: ControllerWrapperTable<T>) => void;
} & ControllerWrapperTableProps<T>;

type ControllerInnerProps<T extends {} = {}> =
      TypeControllerInnerProps<ControllerWrapperTableProps<T>, keyof typeof ControllerWrapperTable.$propsDefault>;
declare module 'zova-module-devui-restpage' {
  export interface ControllerWrapperTable<T extends {} = {}> {
    $props: ControllerInnerProps<T>;
  }
}
declare module 'zova-module-devui-restpage' {
  export interface RenderWrapperTable<T extends {} = {}> extends ControllerWrapperTable<T> {}
}
export const ZWrapperTable = defineComponent(
  <T extends {} = {}>(_props: TypeControllerWrapperTablePublicProps<T>) => {
    useController(ControllerWrapperTable, RenderWrapperTable, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
