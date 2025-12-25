import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerFormFieldTest } from '../../component/formFieldTest/controller.jsx';

export interface TypeControllerFormFieldTestPublicProps {
  controllerRef?: (ref: ControllerFormFieldTest) => void;
}

export const ZFormFieldTest = defineComponent(
  (_props: TypeControllerFormFieldTestPublicProps) => {
    useController(ControllerFormFieldTest, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
