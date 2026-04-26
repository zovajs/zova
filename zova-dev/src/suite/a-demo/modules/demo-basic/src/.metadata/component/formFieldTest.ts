import type { TypeControllerInnerProps } from 'zova';

import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';

import type { ControllerFormFieldTestProps } from '../../component/formFieldTest/controller.jsx';

import { ControllerFormFieldTest } from '../../component/formFieldTest/controller.jsx';
export type TypeControllerFormFieldTestPublicProps = {
  controllerRef?: (ref: ControllerFormFieldTest) => void;
} & ControllerFormFieldTestProps;

type ControllerInnerProps = TypeControllerInnerProps<
  ControllerFormFieldTestProps,
  keyof typeof ControllerFormFieldTest.$propsDefault
>;
declare module 'zova-module-demo-basic' {
  export interface ControllerFormFieldTest {
    $props: ControllerInnerProps;
  }
}

export const ZFormFieldTest = defineComponent((_props: TypeControllerFormFieldTestPublicProps) => {
  useController(ControllerFormFieldTest, undefined, undefined);
  return () => {};
}, prepareComponentOptions(ControllerFormFieldTest.$componentOptions));
