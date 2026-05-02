import type { TypeControllerInnerProps } from 'zova';

import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';

import type { ControllerActionBackProps } from '../../component/actionBack/controller.jsx';

import { ControllerActionBack } from '../../component/actionBack/controller.jsx';
export type TypeControllerActionBackPublicProps = {
  controllerRef?: (ref: ControllerActionBack) => void;
} & ControllerActionBackProps;

type ControllerInnerProps = TypeControllerInnerProps<
  ControllerActionBackProps,
  keyof typeof ControllerActionBack.$propsDefault
>;
declare module 'zova-module-basic-form' {
  export interface ControllerActionBack {
    $props: ControllerInnerProps;
  }
}

export const ZActionBack = defineComponent((_props: TypeControllerActionBackPublicProps) => {
  useController(ControllerActionBack, undefined, undefined);
  return () => {};
}, prepareComponentOptions(ControllerActionBack.$componentOptions));
