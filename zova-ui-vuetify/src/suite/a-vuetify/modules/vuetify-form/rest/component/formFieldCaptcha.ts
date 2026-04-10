import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerFormFieldCaptchaProps } from 'zova-module-vuetify-form';

type TypeControllerFormFieldCaptchaPublicProps = TypeRenderComponentJsxPropsPublic & ControllerFormFieldCaptchaProps;
export function BBFVuetifyFormCaptcha(_props: TypeControllerFormFieldCaptchaPublicProps) {
  return 'vuetify-form:formFieldCaptcha';
}
