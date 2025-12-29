import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerFormFieldCaptchaProps } from '../../src/component/formFieldCaptcha/controller.jsx';

type TypeControllerFormFieldCaptchaPublicProps = TypeRenderComponentJsxPropsPublic
  & ControllerFormFieldCaptchaProps;
export function ZHomeUserFormFieldCaptcha(
  _props: TypeControllerFormFieldCaptchaPublicProps,
) {
  return 'home-user:formFieldCaptcha';
}
