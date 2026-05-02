import type { TypeControllerInnerProps } from 'zova';

import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';

import type { ControllerActionSubmitProps } from '../../component/actionSubmit/controller.jsx';

import { ControllerActionSubmit } from '../../component/actionSubmit/controller.jsx';
export type TypeControllerActionSubmitPublicProps = {
  controllerRef?: (ref: ControllerActionSubmit) => void;
} & ControllerActionSubmitProps;

type ControllerInnerProps = TypeControllerInnerProps<
  ControllerActionSubmitProps,
  keyof typeof ControllerActionSubmit.$propsDefault
>;
declare module 'zova-module-basic-form' {
  export interface ControllerActionSubmit {
    $props: ControllerInnerProps;
  }
}

export const ZActionSubmit = defineComponent((_props: TypeControllerActionSubmitPublicProps) => {
  useController(ControllerActionSubmit, undefined, undefined);
  return () => {};
}, prepareComponentOptions(ControllerActionSubmit.$componentOptions));
