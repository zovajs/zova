import type { TypeControllerInnerProps } from 'zova';
import type { ControllerFormFieldProps } from '../../component/formField/controller.jsx';
import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerFormField } from '../../component/formField/controller.jsx';
import { RenderFormField } from '../../component/formField/render.jsx';

export type TypeControllerFormFieldPublicProps<_T = unknown> = {
  controllerRef?: (ref: ControllerFormField<_T>) => void;
} & ControllerFormFieldProps<_T>;

type ControllerInnerProps<_T = unknown> =
      TypeControllerInnerProps<ControllerFormFieldProps<_T>, keyof typeof ControllerFormField.$propsDefault>;
declare module 'zova-module-a-form' {
  export interface ControllerFormField<_T = unknown> {
    $props: ControllerInnerProps<_T>;
  }
}
declare module 'zova-module-a-form' {
  export interface RenderFormField<_T = unknown> extends ControllerFormField<_T> {}
}
export const ZFormField = defineComponent(
  <_T = unknown>(_props: TypeControllerFormFieldPublicProps<_T>) => {
    useController(ControllerFormField, RenderFormField, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
