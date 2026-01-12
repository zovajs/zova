import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerRestPageEntry } from '../../component/restPageEntry/controller.jsx';

export interface TypeControllerRestPageEntryPublicProps {
  controllerRef?: (ref: ControllerRestPageEntry) => void;
}

export const ZRestPageEntry = defineComponent(
  (_props: TypeControllerRestPageEntryPublicProps) => {
    useController(ControllerRestPageEntry, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
