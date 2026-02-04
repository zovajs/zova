import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerFormFieldCaptchaProps } from '../../src/component/formFieldCaptcha/controller.jsx';

type TypeControllerFormFieldCaptchaPublicProps = TypeRenderComponentJsxPropsPublic
  & ControllerFormFieldCaptchaProps;
export function FFQuasarFormCaptcha(
  _props: TypeControllerFormFieldCaptchaPublicProps,
) {
  return 'quasar-form:formFieldCaptcha';
}
