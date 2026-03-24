import type { TypeControllerInnerProps } from 'zova';

import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';

import type { ControllerActionViewProps } from '../../component/actionView/controller.jsx';

import { ControllerActionView } from '../../component/actionView/controller.jsx';
export type TypeControllerActionViewPublicProps = {
  controllerRef?: (ref: ControllerActionView) => void;
} & ControllerActionViewProps;

type ControllerInnerProps = TypeControllerInnerProps<ControllerActionViewProps, keyof typeof ControllerActionView.$propsDefault>;
declare module 'zova-module-demo-basic' {
  export interface ControllerActionView {
    $props: ControllerInnerProps;
  }
}

export const ZActionView = defineComponent((_props: TypeControllerActionViewPublicProps) => {
  useController(ControllerActionView, undefined, undefined);
  return () => {};
}, prepareComponentOptions());
