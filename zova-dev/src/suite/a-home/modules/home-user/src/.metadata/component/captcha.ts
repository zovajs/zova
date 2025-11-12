import type { TypeControllerInnerProps } from 'zova';
import type { ControllerCaptchaProps } from '../../component/captcha/controller.jsx';
import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerCaptcha } from '../../component/captcha/controller.jsx';

export type TypeControllerCaptchaPublicProps = {
  controllerRef?: (ref: ControllerCaptcha) => void;
} & ControllerCaptchaProps;

type ControllerInnerProps =
  TypeControllerInnerProps<ControllerCaptchaProps, keyof typeof ControllerCaptcha.$propsDefault>;
declare module 'zova-module-home-user' {
  export interface ControllerCaptcha {
    $props: ControllerInnerProps;
  }
}

export const ZCaptcha = defineComponent(
  (_props: TypeControllerCaptchaPublicProps) => {
    useController(ControllerCaptcha, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
