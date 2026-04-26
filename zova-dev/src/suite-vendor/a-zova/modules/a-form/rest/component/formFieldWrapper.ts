import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerFormFieldWrapperProps } from 'zova-module-a-form';

type TypeControllerFormFieldWrapperPublicProps<
  TParentData extends {} = {},
  TSubmitMeta = never,
> = TypeRenderComponentJsxPropsPublic & ControllerFormFieldWrapperProps<TParentData, TSubmitMeta>;
export function BBFFormWrapper<TParentData extends {} = {}, TSubmitMeta = never>(
  _props: TypeControllerFormFieldWrapperPublicProps<TParentData, TSubmitMeta>,
) {
  return 'a-form:formFieldWrapper';
}
