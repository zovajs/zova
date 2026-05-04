import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerFormFieldCurrencyProps } from 'zova-module-basic-currency';

type TypeControllerFormFieldCurrencyPublicProps = TypeRenderComponentJsxPropsPublic &
  ControllerFormFieldCurrencyProps;
export function BBFBasicCurrency(_props: TypeControllerFormFieldCurrencyPublicProps) {
  return 'basic-currency:formFieldCurrency';
}
