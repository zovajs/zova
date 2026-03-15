import type { TypeControllerInnerProps } from 'zova';
import type { ControllerRestPageEntryProps } from '../../component/restPageEntry/controller.jsx';
import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerRestPageEntry } from '../../component/restPageEntry/controller.jsx';
import { RenderRestPageEntry } from '../../component/restPageEntry/render.jsx';

export type TypeControllerRestPageEntryPublicProps<TData extends {} = {}> = {
  controllerRef?: (ref: ControllerRestPageEntry<TData>) => void;
} & ControllerRestPageEntryProps<TData>;

type ControllerInnerProps<TData extends {} = {}> =
  TypeControllerInnerProps<ControllerRestPageEntryProps<TData>, keyof typeof ControllerRestPageEntry.$propsDefault>;
declare module 'zova-module-basic-restpage' {
  export interface ControllerRestPageEntry<TData extends {} = {}> {
    $props: ControllerInnerProps<TData>;
  }
}
declare module 'zova-module-basic-restpage' {
  export interface RenderRestPageEntry<TData extends {} = {}> extends ControllerRestPageEntry<TData> {}
}
export const ZRestPageEntry = defineComponent(
  <TData extends {} = {}>(_props: TypeControllerRestPageEntryPublicProps<TData>) => {
    useController(ControllerRestPageEntry, RenderRestPageEntry, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
