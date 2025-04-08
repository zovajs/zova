import type { ControllerPageProps } from '../../component/page/controller.jsx';
import { defineComponent } from 'vue';
import { useController } from 'zova';
import { ControllerPage } from '../../component/page/controller.jsx';

export const ZPage = defineComponent(
  (_props: ControllerPageProps) => {
    useController(ControllerPage, undefined, undefined);
    return () => {
      return null;
    };
  },
);
