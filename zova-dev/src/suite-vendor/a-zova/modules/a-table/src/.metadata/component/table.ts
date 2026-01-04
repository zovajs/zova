import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerTable } from '../../component/table/controller.jsx';
import { RenderTable } from '../../component/table/render.jsx';

export interface TypeControllerTablePublicProps {
  controllerRef?: (ref: ControllerTable) => void;
}

declare module 'zova-module-a-table' {
  export interface RenderTable extends ControllerTable {}
}
export const ZTable = defineComponent(
  (_props: TypeControllerTablePublicProps) => {
    useController(ControllerTable, RenderTable, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
