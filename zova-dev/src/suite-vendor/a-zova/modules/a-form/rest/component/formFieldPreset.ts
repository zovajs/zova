import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerFormFieldPresetProps } from 'zova-module-a-form';

type TypeControllerFormFieldPresetPublicProps<TParentData extends {} = {}> =
  TypeRenderComponentJsxPropsPublic & ControllerFormFieldPresetProps<TParentData>;
export function BBZFormFormFieldPreset<TParentData extends {} = {}>(
  _props: TypeControllerFormFieldPresetPublicProps<TParentData>,
) {
  return 'a-form:FormFieldPreset';
}
