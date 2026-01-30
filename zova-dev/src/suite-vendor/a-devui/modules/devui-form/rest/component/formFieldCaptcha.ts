import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerFormFieldCaptchaProps } from '../../src/component/formFieldCaptcha/controller.jsx';

type TypeControllerFormFieldCaptchaPublicProps = TypeRenderComponentJsxPropsPublic
  & ControllerFormFieldCaptchaProps;
export function FFDevuiFormCaptcha(
  _props: TypeControllerFormFieldCaptchaPublicProps,
) {
  return 'devui-form:formFieldCaptcha';
}
