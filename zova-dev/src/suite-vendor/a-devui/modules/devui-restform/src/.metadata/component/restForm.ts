import type { TypeControllerInnerProps } from 'zova';
import type { ControllerRestFormProps } from '../../component/restForm/controller.jsx';
import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerRestForm } from '../../component/restForm/controller.jsx';
import { RenderRestForm } from '../../component/restForm/render.jsx';

export type TypeControllerRestFormPublicProps<_T = unknown> = {
  controllerRef?: (ref: ControllerRestForm<_T>) => void;
} & ControllerRestFormProps<_T>;

type ControllerInnerProps<_T = unknown> =
      TypeControllerInnerProps<ControllerRestFormProps<_T>, keyof typeof ControllerRestForm.$propsDefault>;
declare module 'zova-module-devui-restform' {
  export interface ControllerRestForm<_T = unknown> {
    $props: ControllerInnerProps<_T>;
  }
}
declare module 'zova-module-devui-restform' {
  export interface RenderRestForm<_T = unknown> extends ControllerRestForm<_T> {}
}
export const ZRestForm = defineComponent(
  <_T = unknown>(_props: TypeControllerRestFormPublicProps<_T>) => {
    useController(ControllerRestForm, RenderRestForm, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
