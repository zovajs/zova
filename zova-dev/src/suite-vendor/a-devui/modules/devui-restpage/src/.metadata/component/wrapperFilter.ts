import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerWrapperFilter } from '../../component/wrapperFilter/controller.jsx';

export interface TypeControllerWrapperFilterPublicProps {
  controllerRef?: (ref: ControllerWrapperFilter) => void;
}

export const ZWrapperFilter = defineComponent(
  (_props: TypeControllerWrapperFilterPublicProps) => {
    useController(ControllerWrapperFilter, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
