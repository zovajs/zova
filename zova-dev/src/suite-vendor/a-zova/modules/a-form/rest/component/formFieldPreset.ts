import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerFormFieldPresetProps } from 'zova-module-a-form';
import type { ISchemaRenderComponentPresetRecord } from 'zova-module-a-openapi';

type TypeControllerFormFieldPresetPublicProps<
  TParentData extends {} = {},
  TComponentName extends keyof ISchemaRenderComponentPresetRecord =
    keyof ISchemaRenderComponentPresetRecord,
> = TypeRenderComponentJsxPropsPublic & ControllerFormFieldPresetProps<TParentData, TComponentName>;
export function BBFFormPreset<
  TParentData extends {} = {},
  TComponentName extends keyof ISchemaRenderComponentPresetRecord =
    keyof ISchemaRenderComponentPresetRecord,
>(_props: TypeControllerFormFieldPresetPublicProps<TParentData, TComponentName>) {
  return 'a-form:formFieldPreset';
}
