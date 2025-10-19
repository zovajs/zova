import type { TypeControllerInnerProps } from 'zova';
import type { ControllerFormProps } from '../../component/form/controller.jsx';
import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerForm } from '../../component/form/controller.jsx';
import { RenderForm } from '../../component/form/render.jsx';

export type TypeControllerFormPublicProps<T extends {} = {}> = {
  controllerRef?: (ref: ControllerForm<T>) => void;
} & ControllerFormProps<T>;

type ControllerInnerProps<T extends {} = {}> =
  TypeControllerInnerProps<ControllerFormProps<T>, keyof typeof ControllerForm.$propsDefault>;
declare module 'zova-module-a-form' {
  export interface ControllerForm<T extends {} = {}> {
    $props: ControllerInnerProps<T>;
  }
}
declare module 'zova-module-a-form' {
  export interface RenderForm<T extends {} = {}> extends ControllerForm<T> {}
}
export const ZForm = defineComponent(
  <T extends {} = {}>(_props: TypeControllerFormPublicProps<T>) => {
    useController(ControllerForm, RenderForm, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
