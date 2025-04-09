import type { RequiredSome } from 'zova';
import type { ControllerLayoutDefaultProps } from '../../component/layoutDefault/controller.jsx';
import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerLayoutDefault } from '../../component/layoutDefault/controller.jsx';
import { RenderLayoutDefault } from '../../component/layoutDefault/render.jsx';
import { StyleLayoutDefault } from '../../component/layoutDefault/style.js';

declare module 'zova-module-home-layout' {

  export interface ControllerLayoutDefaultProps {
    controllerRef?: (ref: ControllerLayoutDefault) => void;
  }

  export interface ControllerLayoutDefault {
    $props: RequiredSome<ControllerLayoutDefaultProps, keyof typeof ControllerLayoutDefault.$propsDefault>;
  }
}

export const ZLayoutDefault = defineComponent(
  (_props: ControllerLayoutDefaultProps) => {
    useController(ControllerLayoutDefault, RenderLayoutDefault, StyleLayoutDefault);
    return () => {};
  },
  prepareComponentOptions(),
);
