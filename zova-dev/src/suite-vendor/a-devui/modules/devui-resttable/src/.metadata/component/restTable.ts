import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerRestTable } from '../../component/restTable/controller.jsx';
import { RenderRestTable } from '../../component/restTable/render.jsx';

export interface TypeControllerRestTablePublicProps {
  controllerRef?: (ref: ControllerRestTable) => void;
}

declare module 'zova-module-devui-resttable' {
  export interface RenderRestTable extends ControllerRestTable {}
}
export const ZRestTable = defineComponent(
  (_props: TypeControllerRestTablePublicProps) => {
    useController(ControllerRestTable, RenderRestTable, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
