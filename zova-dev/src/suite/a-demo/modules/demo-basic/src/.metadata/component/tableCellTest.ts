import type { TypeControllerInnerProps } from 'zova';

import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';

import type { ControllerTableCellTestProps } from '../../component/tableCellTest/controller.jsx';

import { ControllerTableCellTest } from '../../component/tableCellTest/controller.jsx';

export type TypeControllerTableCellTestPublicProps = {
  controllerRef?: (ref: ControllerTableCellTest) => void;
} & ControllerTableCellTestProps;

type ControllerInnerProps = TypeControllerInnerProps<ControllerTableCellTestProps, keyof typeof ControllerTableCellTest.$propsDefault>;
declare module 'zova-module-demo-basic' {
  export interface ControllerTableCellTest {
    $props: ControllerInnerProps;
  }
}

export const ZTableCellTest = defineComponent((_props: TypeControllerTableCellTestPublicProps) => {
  useController(ControllerTableCellTest, undefined, undefined);
  return () => {};
}, prepareComponentOptions());
