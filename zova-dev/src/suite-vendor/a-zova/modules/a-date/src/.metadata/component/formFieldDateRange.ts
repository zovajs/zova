import type { TypeControllerInnerProps } from 'zova';
import type { ControllerFormFieldDateRangeProps } from '../../component/formFieldDateRange/controller.jsx';
import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerFormFieldDateRange } from '../../component/formFieldDateRange/controller.jsx';

export type TypeControllerFormFieldDateRangePublicProps = {
  controllerRef?: (ref: ControllerFormFieldDateRange) => void;
} & ControllerFormFieldDateRangeProps;

type ControllerInnerProps =
  TypeControllerInnerProps<ControllerFormFieldDateRangeProps, keyof typeof ControllerFormFieldDateRange.$propsDefault>;
declare module 'zova-module-a-date' {
  export interface ControllerFormFieldDateRange {
    $props: ControllerInnerProps;
  }
}

export const ZFormFieldDateRange = defineComponent(
  (_props: TypeControllerFormFieldDateRangePublicProps) => {
    useController(ControllerFormFieldDateRange, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
