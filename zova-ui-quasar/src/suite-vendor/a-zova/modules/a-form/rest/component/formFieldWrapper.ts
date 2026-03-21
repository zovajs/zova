import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';

import type { ControllerFormFieldWrapperProps } from '../../src/component/formFieldWrapper/controller.jsx';

type TypeControllerFormFieldWrapperPublicProps<TParentData extends {} = {}> = TypeRenderComponentJsxPropsPublic &
  ControllerFormFieldWrapperProps<TParentData>;
export function FFFormWrapper<TParentData extends {} = {}>(_props: TypeControllerFormFieldWrapperPublicProps<TParentData>) {
  return 'a-form:formFieldWrapper';
}
