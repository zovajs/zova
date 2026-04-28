import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerFormFieldPresetProps } from 'zova-module-a-form';

type TypeControllerFormFieldPresetPublicProps<TParentData extends {} = {}> =
  TypeRenderComponentJsxPropsPublic & ControllerFormFieldPresetProps<TParentData>;
export function BBFFormPreset<TParentData extends {} = {}>(
  _props: TypeControllerFormFieldPresetPublicProps<TParentData>,
) {
  return 'a-form:formFieldPreset';
}
