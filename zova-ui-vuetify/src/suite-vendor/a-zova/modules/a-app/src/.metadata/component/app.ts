import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';

import { ControllerApp } from '../../component/app/controller.jsx';

export interface TypeControllerAppPublicProps {
  controllerRef?: (ref: ControllerApp) => void;
}

export const ZApp = defineComponent((_props: TypeControllerAppPublicProps) => {
  useController(ControllerApp, undefined, undefined);
  return () => {};
}, prepareComponentOptions(ControllerApp.$componentOptions));
