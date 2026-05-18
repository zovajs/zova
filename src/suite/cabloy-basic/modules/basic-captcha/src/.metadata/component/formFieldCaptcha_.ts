import type { TypeControllerInnerProps } from 'zova';

import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';

import type { ControllerFormFieldCaptchaProps } from '../../component/formFieldCaptcha_/controller.jsx';

import { ControllerFormFieldCaptcha } from '../../component/formFieldCaptcha_/controller.jsx';
export type TypeControllerFormFieldCaptcha_PublicProps = {
  controllerRef?: (ref: ControllerFormFieldCaptcha) => void;
} & ControllerFormFieldCaptchaProps;

type ControllerInnerProps = TypeControllerInnerProps<
  ControllerFormFieldCaptchaProps,
  keyof typeof ControllerFormFieldCaptcha.$propsDefault
>;
declare module 'zova-module-basic-captcha' {
  export interface ControllerFormFieldCaptcha {
    $props: ControllerInnerProps;
  }
}

export const ZFormFieldCaptcha_ = defineComponent(
  (_props: TypeControllerFormFieldCaptcha_PublicProps) => {
    useController(ControllerFormFieldCaptcha, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(ControllerFormFieldCaptcha_.$componentOptions),
);
declare module 'zova-module-a-bean' {
  export interface IVonaComponentRecord {
    'basic-captcha:formFieldCaptcha_': ControllerFormFieldCaptchaProps;
  }
}
