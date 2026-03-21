import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';

import type { ControllerFormFieldCaptchaProps } from '../../src/component/formFieldCaptcha/controller.jsx';

type TypeControllerFormFieldCaptchaPublicProps = TypeRenderComponentJsxPropsPublic & ControllerFormFieldCaptchaProps;
export function FFVuetifyFormCaptcha(_props: TypeControllerFormFieldCaptchaPublicProps) {
  return 'vuetify-form:formFieldCaptcha';
}
