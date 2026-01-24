import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerRestPageEntry } from '../../component/restPageEntry/controller.jsx';
import { RenderRestPageEntry } from '../../component/restPageEntry/render.jsx';

export interface TypeControllerRestPageEntryPublicProps {
  controllerRef?: (ref: ControllerRestPageEntry) => void;
}

declare module 'zova-module-devui-restpage' {
  export interface RenderRestPageEntry extends ControllerRestPageEntry {}
}
export const ZRestPageEntry = defineComponent(
  (_props: TypeControllerRestPageEntryPublicProps) => {
    useController(ControllerRestPageEntry, RenderRestPageEntry, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
