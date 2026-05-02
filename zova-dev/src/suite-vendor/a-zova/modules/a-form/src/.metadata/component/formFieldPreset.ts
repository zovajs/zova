import type { TypeControllerInnerProps } from 'zova';
import type { ISchemaRenderComponentPresetRecord } from 'zova-module-a-openapi';

import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';

import type { ControllerFormFieldPresetProps } from '../../component/formFieldPreset/controller.jsx';

import { ControllerFormFieldPreset } from '../../component/formFieldPreset/controller.jsx';
export type TypeControllerFormFieldPresetPublicProps<
  TParentData extends {} = {},
  TComponentName extends keyof ISchemaRenderComponentPresetRecord =
    keyof ISchemaRenderComponentPresetRecord,
> = {
  controllerRef?: (ref: ControllerFormFieldPreset<TParentData, TComponentName>) => void;
} & ControllerFormFieldPresetProps<TParentData, TComponentName>;

type ControllerInnerProps<
  TParentData extends {} = {},
  TComponentName extends keyof ISchemaRenderComponentPresetRecord =
    keyof ISchemaRenderComponentPresetRecord,
> = TypeControllerInnerProps<
  ControllerFormFieldPresetProps<TParentData, TComponentName>,
  keyof typeof ControllerFormFieldPreset.$propsDefault
>;
declare module 'zova-module-a-form' {
  export interface ControllerFormFieldPreset<
    TParentData extends {} = {},
    TComponentName extends keyof ISchemaRenderComponentPresetRecord =
      keyof ISchemaRenderComponentPresetRecord,
  > {
    $props: ControllerInnerProps<TParentData, TComponentName>;
  }
}

export const ZFormFieldPreset = defineComponent(
  <
    TParentData extends {} = {},
    TComponentName extends keyof ISchemaRenderComponentPresetRecord =
      keyof ISchemaRenderComponentPresetRecord,
  >(
    _props: TypeControllerFormFieldPresetPublicProps<TParentData, TComponentName>,
  ) => {
    useController(ControllerFormFieldPreset, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(ControllerFormFieldPreset.$componentOptions),
);
