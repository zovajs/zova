import type { TypeControllerInnerProps } from 'zova';

import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';

import type { ControllerRestPageProps } from '../../component/restPage/controller.jsx';

import { ControllerRestPage } from '../../component/restPage/controller.jsx';
import { RenderRestPage } from '../../component/restPage/render.jsx';

export type TypeControllerRestPagePublicProps<TData extends {} = {}> = {
  controllerRef?: (ref: ControllerRestPage<TData>) => void;
} & ControllerRestPageProps<TData>;

type ControllerInnerProps<TData extends {} = {}> = TypeControllerInnerProps<
  ControllerRestPageProps<TData>,
  keyof typeof ControllerRestPage.$propsDefault
>;
declare module 'zova-module-basic-restpage' {
  export interface ControllerRestPage<TData extends {} = {}> {
    $props: ControllerInnerProps<TData>;
  }
}
declare module 'zova-module-basic-restpage' {
  export interface RenderRestPage<TData extends {} = {}> extends ControllerRestPage<TData> {}
}
export const ZRestPage = defineComponent(<TData extends {} = {}>(_props: TypeControllerRestPagePublicProps<TData>) => {
  useController(ControllerRestPage, RenderRestPage, undefined);
  return () => {};
}, prepareComponentOptions());
