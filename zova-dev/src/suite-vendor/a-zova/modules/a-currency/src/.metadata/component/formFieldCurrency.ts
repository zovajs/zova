import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerFormFieldCurrency } from '../../component/formFieldCurrency/controller.jsx';

export interface TypeControllerFormFieldCurrencyPublicProps {
  controllerRef?: (ref: ControllerFormFieldCurrency) => void;
}

export const ZFormFieldCurrency = defineComponent(
  (_props: TypeControllerFormFieldCurrencyPublicProps) => {
    useController(ControllerFormFieldCurrency, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
