import type { RequiredSome } from 'zova';
import type { ControllerRouterViewTabsProps } from '../../component/routerViewTabs/controller.jsx';
import { defineComponent } from 'vue';
import { useController } from 'zova';
import { ControllerRouterViewTabs } from '../../component/routerViewTabs/controller.jsx';

declare module 'zova-module-a-tabs' {

  export interface ControllerRouterViewTabsProps {
    controllerRef?: (ref: ControllerRouterViewTabs) => void;
  }

  export interface ControllerRouterViewTabs {
    $props: RequiredSome<ControllerRouterViewTabsProps, keyof typeof ControllerRouterViewTabs.$propsDefault>;
  }
}

export const ZRouterViewTabs = defineComponent(
  (_props: ControllerRouterViewTabsProps) => {
    useController(ControllerRouterViewTabs, undefined, undefined);
    return () => {
      return null;
    };
  },
);
