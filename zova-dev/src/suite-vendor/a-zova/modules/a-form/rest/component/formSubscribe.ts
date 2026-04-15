import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerFormSubscribeProps } from 'zova-module-a-form';

type TypeControllerFormSubscribePublicProps<TFormData extends {} = {}, TSubmitMeta = never> = TypeRenderComponentJsxPropsPublic &
  ControllerFormSubscribeProps<TFormData, TSubmitMeta>;
export function BBZFormSubscribe<TFormData extends {} = {}, TSubmitMeta = never>(
  _props: TypeControllerFormSubscribePublicProps<TFormData, TSubmitMeta>,
) {
  return 'a-form:formSubscribe';
}
