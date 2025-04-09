import type { RequiredSome } from 'zova';
import type { ControllerPageProps } from '../../component/page/controller.jsx';
import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerPage } from '../../component/page/controller.jsx';

declare module 'zova-module-home-base' {

  export interface ControllerPageProps {
    controllerRef?: (ref: ControllerPage) => void;
  }

  export interface ControllerPage {
    $props: RequiredSome<ControllerPageProps, keyof typeof ControllerPage.$propsDefault>;
  }
}

export const ZPage = defineComponent(
  (_props: ControllerPageProps) => {
    useController(ControllerPage, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
