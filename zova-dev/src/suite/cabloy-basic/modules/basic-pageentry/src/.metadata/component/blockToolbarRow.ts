import type { TypeControllerInnerProps } from 'zova';

import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';

import type { ControllerBlockToolbarRowProps } from '../../component/blockToolbarRow/controller.jsx';

import { ControllerBlockToolbarRow } from '../../component/blockToolbarRow/controller.jsx';
export type TypeControllerBlockToolbarRowPublicProps = {
  controllerRef?: (ref: ControllerBlockToolbarRow) => void;
} & ControllerBlockToolbarRowProps;

type ControllerInnerProps = TypeControllerInnerProps<
  ControllerBlockToolbarRowProps,
  keyof typeof ControllerBlockToolbarRow.$propsDefault
>;
declare module 'zova-module-basic-pageentry' {
  export interface ControllerBlockToolbarRow {
    $props: ControllerInnerProps;
  }
}

export const ZBlockToolbarRow = defineComponent(
  (_props: TypeControllerBlockToolbarRowPublicProps) => {
    useController(ControllerBlockToolbarRow, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(ControllerBlockToolbarRow.$componentOptions),
);
