import type { TypeControllerInnerProps } from 'zova';
import type { ControllerLayoutTabsProps } from '../../component/layoutTabs/controller.jsx';
import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerLayoutTabs } from '../../component/layoutTabs/controller.jsx';
import { RenderLayoutTabs } from '../../component/layoutTabs/render.jsx';

export type TypeControllerLayoutTabsPublicProps = {
  controllerRef?: (ref: ControllerLayoutTabs) => void;
} & ControllerLayoutTabsProps;

type ControllerInnerProps =
  TypeControllerInnerProps<ControllerLayoutTabsProps, keyof typeof ControllerLayoutTabs.$propsDefault>;
declare module 'zova-module-home-layout' {
  export interface ControllerLayoutTabs {
    $props: ControllerInnerProps;
  }
}
declare module 'zova-module-home-layout' {
  export interface RenderLayoutTabs extends ControllerLayoutTabs {}
}
export const ZLayoutTabs = defineComponent(
  (_props: TypeControllerLayoutTabsPublicProps) => {
    useController(ControllerLayoutTabs, RenderLayoutTabs, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
