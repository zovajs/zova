import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerFormFieldCaptchaProps } from 'zova-module-quasar-form';

type TypeControllerFormFieldCaptchaPublicProps = TypeRenderComponentJsxPropsPublic & ControllerFormFieldCaptchaProps;
export function BBFQuasarFormCaptcha(_props: TypeControllerFormFieldCaptchaPublicProps) {
  return 'quasar-form:formFieldCaptcha';
}
