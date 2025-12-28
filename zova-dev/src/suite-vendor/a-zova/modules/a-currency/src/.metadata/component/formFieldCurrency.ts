import type { TypeControllerInnerProps } from 'zova';
import type { ControllerFormFieldCurrencyProps } from '../../component/formFieldCurrency/controller.jsx';
import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';
import { ControllerFormFieldCurrency } from '../../component/formFieldCurrency/controller.jsx';

export type TypeControllerFormFieldCurrencyPublicProps = {
  controllerRef?: (ref: ControllerFormFieldCurrency) => void;
} & ControllerFormFieldCurrencyProps;

type ControllerInnerProps =
  TypeControllerInnerProps<ControllerFormFieldCurrencyProps, keyof typeof ControllerFormFieldCurrency.$propsDefault>;
declare module 'zova-module-a-currency' {
  export interface ControllerFormFieldCurrency {
    $props: ControllerInnerProps;
  }
}

export const ZFormFieldCurrency = defineComponent(
  (_props: TypeControllerFormFieldCurrencyPublicProps) => {
    useController(ControllerFormFieldCurrency, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(),
);
