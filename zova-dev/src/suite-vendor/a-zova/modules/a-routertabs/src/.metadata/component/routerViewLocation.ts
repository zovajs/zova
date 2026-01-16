import type { TypeControllerInnerProps } from 'zova';
import type { ControllerRouterViewLocationProps } from '../../component/routerViewLocation/controller.jsx';
import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerRouterViewLocation } from '../../component/routerViewLocation/controller.jsx';

export type TypeControllerRouterViewLocationPublicProps = {
  controllerRef?: (ref: ControllerRouterViewLocation) => void;
} & ControllerRouterViewLocationProps;

type ControllerInnerProps =
  TypeControllerInnerProps<ControllerRouterViewLocationProps, keyof typeof ControllerRouterViewLocation.$propsDefault>;
declare module 'zova-module-a-tabs' {
  export interface ControllerRouterViewLocation {
    $props: ControllerInnerProps;
  }
}

export const ZRouterViewLocation = defineComponent(
  (_props: TypeControllerRouterViewLocationPublicProps) => {
    useController(ControllerRouterViewLocation, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
