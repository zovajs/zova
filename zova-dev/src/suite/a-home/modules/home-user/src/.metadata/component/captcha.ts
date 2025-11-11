import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerCaptcha } from '../../component/captcha/controller.jsx';

export interface TypeControllerCaptchaPublicProps {
  controllerRef?: (ref: ControllerCaptcha) => void;
}

export const ZCaptcha = defineComponent(
  (_props: TypeControllerCaptchaPublicProps) => {
    useController(ControllerCaptcha, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
