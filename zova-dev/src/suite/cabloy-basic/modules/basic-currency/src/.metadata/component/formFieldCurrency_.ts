import type { TypeControllerInnerProps } from 'zova';

import { defineComponent } from 'vue';
import { prepareComponentOptions, useController } from 'zova';

import type { ControllerFormFieldCurrencyProps } from '../../component/formFieldCurrency_/controller.jsx';

import { ControllerFormFieldCurrency } from '../../component/formFieldCurrency_/controller.jsx';
export type TypeControllerFormFieldCurrency_PublicProps = {
  controllerRef?: (ref: ControllerFormFieldCurrency) => void;
} & ControllerFormFieldCurrencyProps;

type ControllerInnerProps = TypeControllerInnerProps<
  ControllerFormFieldCurrencyProps,
  keyof typeof ControllerFormFieldCurrency.$propsDefault
>;
declare module 'zova-module-basic-currency' {
  export interface ControllerFormFieldCurrency {
    $props: ControllerInnerProps;
  }
}

export const ZFormFieldCurrency_ = defineComponent(
  (_props: TypeControllerFormFieldCurrency_PublicProps) => {
    useController(ControllerFormFieldCurrency, undefined, undefined);
    return () => {};
  },
  prepareComponentOptions(ControllerFormFieldCurrency_.$componentOptions),
);
declare module 'zova-module-a-bean' {
  export interface IVonaComponentRecord {
    'basic-currency:formFieldCurrency_': ControllerFormFieldCurrencyProps;
  }
}
