import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerFormFieldWrapperProps } from 'zova-module-a-form';

type TypeControllerFormFieldWrapperPublicProps<TParentData extends {} = {}> =
  TypeRenderComponentJsxPropsPublic & ControllerFormFieldWrapperProps<TParentData>;
export function BBFFormWrapper<TParentData extends {} = {}>(
  _props: TypeControllerFormFieldWrapperPublicProps<TParentData>,
) {
  return 'a-form:formFieldWrapper';
}
