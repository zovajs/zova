import type { TypeControllerInnerProps } from 'zova';
import type { ControllerLayoutEmptyProps } from '../../component/layoutEmpty/controller.jsx';
import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerLayoutEmpty } from '../../component/layoutEmpty/controller.jsx';

export type TypeControllerLayoutEmptyPublicProps = {
  controllerRef?: (ref: ControllerLayoutEmpty) => void;
} & ControllerLayoutEmptyProps;

type ControllerInnerProps =
  TypeControllerInnerProps<ControllerLayoutEmptyProps, keyof typeof ControllerLayoutEmpty.$propsDefault>;
declare module 'zova-module-home-layout' {
  export interface ControllerLayoutEmpty {
    $props: ControllerInnerProps;
  }
}

export const ZLayoutEmpty = defineComponent(
  (_props: TypeControllerLayoutEmptyPublicProps) => {
    useController(ControllerLayoutEmpty, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
