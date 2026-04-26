import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';

import { ControllerRouterViewEmpty } from '../../component/routerViewEmpty/controller.jsx';
export type TypeControllerRouterViewEmptyPublicProps = {
  controllerRef?: (ref: ControllerRouterViewEmpty) => void;
};

export const ZRouterViewEmpty = defineComponent(
  (_props: TypeControllerRouterViewEmptyPublicProps) => {
    useController(ControllerRouterViewEmpty, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
