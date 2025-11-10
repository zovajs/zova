import type { TypeControllerInnerProps } from 'zova';
import type { ControllerFormProps } from '../../component/form/controller.jsx';
import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerForm } from '../../component/form/controller.jsx';
import { RenderForm } from '../../component/form/render.jsx';

export type TypeControllerFormPublicProps<T extends {} = {}, TSubmitMeta = never> = {
  controllerRef?: (ref: ControllerForm<T, TSubmitMeta>) => void;
} & ControllerFormProps<T, TSubmitMeta>;

type ControllerInnerProps<T extends {} = {}, TSubmitMeta = never> =
  TypeControllerInnerProps<ControllerFormProps<T, TSubmitMeta>, keyof typeof ControllerForm.$propsDefault>;
declare module 'zova-module-a-form' {
  export interface ControllerForm<T extends {} = {}, TSubmitMeta = never> {
    $props: ControllerInnerProps<T, TSubmitMeta>;
  }
}
declare module 'zova-module-a-form' {
  export interface RenderForm<T extends {} = {}, TSubmitMeta = never> extends ControllerForm<T, TSubmitMeta> {}
}
export const ZForm = defineComponent(
  <T extends {} = {}, TSubmitMeta = never>(_props: TypeControllerFormPublicProps<T, TSubmitMeta>) => {
    useController(ControllerForm, RenderForm, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
