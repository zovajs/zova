import type { TypeControllerInnerProps } from 'zova';
import type { ControllerFormFieldCaptchaProps } from '../../component/formFieldCaptcha-/controller.jsx';
import { defineComponent } from 'vue'
import { prepareComponentOptions, useController } from 'zova';
import { ControllerFormFieldCaptcha } from '../../component/formFieldCaptcha-/controller.jsx';
export type TypeControllerFormFieldCaptcha-PublicProps = {
    controllerRef?: (ref: ControllerFormFieldCaptcha) => void;
  } & ControllerFormFieldCaptchaProps

type ControllerInnerProps =
      TypeControllerInnerProps<ControllerFormFieldCaptchaProps, keyof typeof ControllerFormFieldCaptcha.$propsDefault>;
declare module 'zova-module-quasar-form' {
      export interface ControllerFormFieldCaptcha {
        $props: ControllerInnerProps;
      }
    }

export const ZFormFieldCaptcha- = defineComponent(
    (_props: TypeControllerFormFieldCaptcha-PublicProps) => {
      useController(ControllerFormFieldCaptcha, undefined, undefined);
      return () => {};
    },
    prepareComponentOptions(ControllerFormFieldCaptcha-.$componentOptions),
  );
declare module 'zova-module-a-bean' {
  export interface IVonaComponentRecord {
    'quasar-form:formFieldCaptcha-': ControllerFormFieldCaptchaProps;
  }
}
