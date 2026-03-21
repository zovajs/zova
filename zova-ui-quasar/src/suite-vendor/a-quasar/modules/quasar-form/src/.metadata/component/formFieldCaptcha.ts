import type { TypeControllerInnerProps } from 'zova';

import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';

import type { ControllerFormFieldCaptchaProps } from '../../component/formFieldCaptcha/controller.jsx';

import { ControllerFormFieldCaptcha } from '../../component/formFieldCaptcha/controller.jsx';

export type TypeControllerFormFieldCaptchaPublicProps = {
  controllerRef?: (ref: ControllerFormFieldCaptcha) => void;
} & ControllerFormFieldCaptchaProps;

type ControllerInnerProps = TypeControllerInnerProps<ControllerFormFieldCaptchaProps, keyof typeof ControllerFormFieldCaptcha.$propsDefault>;
declare module 'zova-module-quasar-form' {
  export interface ControllerFormFieldCaptcha {
    $props: ControllerInnerProps;
  }
}

export const ZFormFieldCaptcha = defineComponent((_props: TypeControllerFormFieldCaptchaPublicProps) => {
  useController(ControllerFormFieldCaptcha, undefined, undefined);
  return () => {};
}, prepareComponentOptions(ControllerFormFieldCaptcha.$componentOptions));
