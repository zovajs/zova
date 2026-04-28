import type { TypeControllerInnerProps } from 'zova';

import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';

import type { ControllerFormFieldPresetProps } from '../../component/FormFieldPreset/controller.jsx';

import { ControllerFormFieldPreset } from '../../component/FormFieldPreset/controller.jsx';
export type TypeControllerFormFieldPresetPublicProps<TParentData extends {} = {}> = {
  controllerRef?: (ref: ControllerFormFieldPreset<TParentData>) => void;
} & ControllerFormFieldPresetProps<TParentData>;

type ControllerInnerProps<TParentData extends {} = {}> = TypeControllerInnerProps<
  ControllerFormFieldPresetProps<TParentData>,
  keyof typeof ControllerFormFieldPreset.$propsDefault
>;
declare module 'zova-module-a-form' {
  export interface ControllerFormFieldPreset<TParentData extends {} = {}> {
    $props: ControllerInnerProps<TParentData>;
  }
}

export const ZFormFieldPreset = defineComponent(
  <TParentData extends {} = {}>(_props: TypeControllerFormFieldPresetPublicProps<TParentData>) => {
    useController(ControllerFormFieldPreset, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(ControllerFormFieldPreset.$componentOptions),
);
