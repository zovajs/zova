import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerFormProps } from 'zova-module-a-form';

type TypeControllerFormPublicProps<
  TFormData extends {} = {},
  TSubmitMeta = never,
> = TypeRenderComponentJsxPropsPublic & ControllerFormProps<TFormData, TSubmitMeta>;
export function BBZForm<TFormData extends {} = {}, TSubmitMeta = never>(
  _props: TypeControllerFormPublicProps<TFormData, TSubmitMeta>,
) {
  return 'a-form:form';
}
