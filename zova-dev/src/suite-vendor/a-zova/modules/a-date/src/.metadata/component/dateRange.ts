import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerDateRange } from '../../component/dateRange/controller.jsx';

export interface TypeControllerDateRangePublicProps {
  controllerRef?: (ref: ControllerDateRange) => void;
}

export const ZDateRange = defineComponent(
  (_props: TypeControllerDateRangePublicProps) => {
    useController(ControllerDateRange, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
