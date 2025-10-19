import type { TypeControllerInnerProps } from 'zova';
import type { ControllerLayoutDefaultProps } from '../../component/layoutDefault/controller.jsx';
import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerLayoutDefault } from '../../component/layoutDefault/controller.jsx';
import { RenderLayoutDefault } from '../../component/layoutDefault/render.jsx';
import { StyleLayoutDefault } from '../../component/layoutDefault/style.js';

export type TypeControllerLayoutDefaultPublicProps = {
  controllerRef?: (ref: ControllerLayoutDefault) => void;
} & ControllerLayoutDefaultProps;

type ControllerInnerProps =
  TypeControllerInnerProps<ControllerLayoutDefaultProps, keyof typeof ControllerLayoutDefault.$propsDefault>;
declare module 'zova-module-home-layout' {
  export interface ControllerLayoutDefault {
    $props: ControllerInnerProps;
  }
}
declare module 'zova-module-home-layout' {
  export interface StyleLayoutDefault extends ControllerLayoutDefault {}
  export interface RenderLayoutDefault extends StyleLayoutDefault {}
  export interface RenderContent extends StyleLayoutDefault {}
  export interface RenderHeader extends StyleLayoutDefault {}
  export interface RenderLocale extends StyleLayoutDefault {}
  export interface RenderMenu extends StyleLayoutDefault {}
  export interface RenderSidebar extends StyleLayoutDefault {}
  export interface RenderTabs extends StyleLayoutDefault {}
  export interface RenderTheme extends StyleLayoutDefault {}
  export interface RenderUser extends StyleLayoutDefault {}
}
export const ZLayoutDefault = defineComponent(
  (_props: TypeControllerLayoutDefaultPublicProps) => {
    useController(ControllerLayoutDefault, RenderLayoutDefault, StyleLayoutDefault);
    return () => {};
  },
  prepareComponentOptions(),
);
