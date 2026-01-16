import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerRouterViewStack } from '../../component/routerViewStack/controller.jsx';

export interface TypeControllerRouterViewStackPublicProps {
  controllerRef?: (ref: ControllerRouterViewStack) => void;
}

export const ZRouterViewStack = defineComponent(
  (_props: TypeControllerRouterViewStackPublicProps) => {
    useController(ControllerRouterViewStack, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
