import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerFormSubscribeProps } from '../../src/component/formSubscribe/controller.jsx';

type TypeControllerFormSubscribePublicProps<TFormData extends {} = {}, TSubmitMeta = never> = TypeRenderComponentJsxPropsPublic
  & ControllerFormSubscribeProps<TFormData, TSubmitMeta>;
export function ZZFormSubscribe<TFormData extends {} = {}, TSubmitMeta = never>(
  _props: TypeControllerFormSubscribePublicProps<TFormData, TSubmitMeta>,
) {
  return 'a-form:formSubscribe';
}
