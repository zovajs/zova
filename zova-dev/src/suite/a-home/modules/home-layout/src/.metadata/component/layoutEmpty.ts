import type { RequiredSome } from 'zova';
import type { ControllerLayoutEmptyProps } from '../../component/layoutEmpty/controller.jsx';
import { defineComponent } from 'vue';
import { useController } from 'zova';
import { ControllerLayoutEmpty } from '../../component/layoutEmpty/controller.jsx';

declare module 'zova-module-home-layout' {

  export interface ControllerLayoutEmptyProps {
    controllerRef?: (ref: ControllerLayoutEmpty) => void;
  }

  export interface ControllerLayoutEmpty {
    $props: RequiredSome<ControllerLayoutEmptyProps, keyof typeof ControllerLayoutEmpty.$propsDefault>;
  }
}

export const ZLayoutEmpty = defineComponent(
  (_props: ControllerLayoutEmptyProps) => {
    useController(ControllerLayoutEmpty, undefined, undefined);
    return () => {
      return null;
    };
  },
);
