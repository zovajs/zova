import type { TypeControllerInnerProps } from 'zova';
import type { ControllerWrapperFilterProps } from '../../component/wrapperFilter/controller.jsx';
import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerWrapperFilter } from '../../component/wrapperFilter/controller.jsx';
import { RenderWrapperFilter } from '../../component/wrapperFilter/render.jsx';

export type TypeControllerWrapperFilterPublicProps = {
  controllerRef?: (ref: ControllerWrapperFilter) => void;
} & ControllerWrapperFilterProps;

type ControllerInnerProps =
  TypeControllerInnerProps<ControllerWrapperFilterProps, keyof typeof ControllerWrapperFilter.$propsDefault>;
declare module 'zova-module-basic-restpage' {
  export interface ControllerWrapperFilter {
    $props: ControllerInnerProps;
  }
}
declare module 'zova-module-basic-restpage' {
  export interface RenderWrapperFilter extends ControllerWrapperFilter {}
}
export const ZWrapperFilter = defineComponent(
  (_props: TypeControllerWrapperFilterPublicProps) => {
    useController(ControllerWrapperFilter, RenderWrapperFilter, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
