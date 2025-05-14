import type { TypeControllerInnerProps } from 'zova';
import type { ControllerWrapperTableProps } from '../../component/wrapperTable/controller.jsx';
import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerWrapperTable } from '../../component/wrapperTable/controller.jsx';
import { RenderWrapperTable } from '../../component/wrapperTable/render.jsx';

export type TypeControllerWrapperTablePublicProps = {
  controllerRef?: (ref: ControllerWrapperTable) => void;
} & ControllerWrapperTableProps;

type ControllerInnerProps =
      TypeControllerInnerProps<ControllerWrapperTableProps, keyof typeof ControllerWrapperTable.$propsDefault>;
declare module 'zova-module-devui-restpage' {
  export interface ControllerWrapperTable {
    $props: ControllerInnerProps;
  }
}
declare module 'zova-module-devui-restpage' {
  export interface RenderWrapperTable extends ControllerWrapperTable {}
}
export const ZWrapperTable = defineComponent(
  (_props: TypeControllerWrapperTablePublicProps) => {
    useController(ControllerWrapperTable, RenderWrapperTable, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
