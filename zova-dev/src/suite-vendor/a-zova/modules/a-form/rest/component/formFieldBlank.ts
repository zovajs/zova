import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerFormFieldBlankProps } from 'zova-module-a-form';

type TypeControllerFormFieldBlankPublicProps<
  TParentData extends {} = {},
  TSubmitMeta = never,
> = TypeRenderComponentJsxPropsPublic & ControllerFormFieldBlankProps<TParentData, TSubmitMeta>;
export function BBFFormBlank<TParentData extends {} = {}, TSubmitMeta = never>(
  _props: TypeControllerFormFieldBlankPublicProps<TParentData, TSubmitMeta>,
) {
  return 'a-form:formFieldBlank';
}
