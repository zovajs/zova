import type { ControllerRouterViewTabsProps } from '../../component/routerViewTabs/controller.jsx';
import { defineComponent } from 'vue';
import { useController } from 'zova';
import { ControllerRouterViewTabs } from '../../component/routerViewTabs/controller.jsx';

export const ZRouterViewTabs = defineComponent(
  (_props: ControllerRouterViewTabsProps) => {
    useController(ControllerRouterViewTabs, undefined, undefined);
    return () => {
      return null;
    };
  },
);
