import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerFormProps } from '../../src/component/form/controller.jsx';

type TypeControllerFormPublicProps<TFormData extends {} = {}, TSubmitMeta = never> = TypeRenderComponentJsxPropsPublic
  & ControllerFormProps<TFormData, TSubmitMeta>;
export function ZForm<TFormData extends {} = {}, TSubmitMeta = never>(
  _props: TypeControllerFormPublicProps<TFormData, TSubmitMeta>,
) {
  return 'a-form:form';
}
