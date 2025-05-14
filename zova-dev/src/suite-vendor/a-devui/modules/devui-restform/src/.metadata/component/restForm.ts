import type { TypeControllerInnerProps } from 'zova';
import type { ControllerRestFormProps } from '../../component/restForm/controller.jsx';
import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerRestForm } from '../../component/restForm/controller.jsx';
import { RenderRestForm } from '../../component/restForm/render.jsx';

export type TypeControllerRestFormPublicProps<T extends {} = {}> = {
  controllerRef?: (ref: ControllerRestForm<T>) => void;
} & ControllerRestFormProps<T>;

type ControllerInnerProps<T extends {} = {}> =
      TypeControllerInnerProps<ControllerRestFormProps<T>, keyof typeof ControllerRestForm.$propsDefault>;
declare module 'zova-module-devui-restform' {
  export interface ControllerRestForm<T extends {} = {}> {
    $props: ControllerInnerProps<T>;
  }
}
declare module 'zova-module-devui-restform' {
  export interface RenderRestForm<T extends {} = {}> extends ControllerRestForm<T> {}
}
export const ZRestForm = defineComponent(
  <T extends {} = {}>(_props: TypeControllerRestFormPublicProps<T>) => {
    useController(ControllerRestForm, RenderRestForm, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
