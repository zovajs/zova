import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerFormFieldProps } from 'zova-module-a-form';

type TypeControllerFormFieldPublicProps<TParentData extends {} = {}> =
  TypeRenderComponentJsxPropsPublic & ControllerFormFieldProps<TParentData>;
export function BBZFormField<TParentData extends {} = {}>(
  _props: TypeControllerFormFieldPublicProps<TParentData>,
) {
  return 'a-form:formField';
}
