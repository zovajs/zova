import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerFormFieldCaptchaProps } from 'zova-module-basic-captcha';

type TypeControllerFormFieldCaptchaPublicProps = TypeRenderComponentJsxPropsPublic &
  ControllerFormFieldCaptchaProps;
export function BBFBasicCaptcha(_props: TypeControllerFormFieldCaptchaPublicProps) {
  return 'basic-captcha:formFieldCaptcha';
}
