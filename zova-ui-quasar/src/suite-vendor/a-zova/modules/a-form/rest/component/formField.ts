import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerFormFieldProps } from '../../src/component/formField/controller.jsx';

type TypeControllerFormFieldPublicProps<TParentData extends {} = {}> = TypeRenderComponentJsxPropsPublic &
  ControllerFormFieldProps<TParentData>;
export function ZZFormField<TParentData extends {} = {}>(
  _props: TypeControllerFormFieldPublicProps<TParentData>,
) {
  return 'a-form:formField';
}
