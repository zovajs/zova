import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerFormFieldWrapperProps } from '../../src/component/formFieldWrapper/controller.jsx';

type TypeControllerFormFieldWrapperPublicProps = TypeRenderComponentJsxPropsPublic
  & ControllerFormFieldWrapperProps;
export function FFFormWrapper(
  _props: TypeControllerFormFieldWrapperPublicProps,
) {
  return 'a-form:formFieldWrapper';
}
