import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerFormFieldCurrencyProps } from 'zova-module-a-currency';

type TypeControllerFormFieldCurrencyPublicProps = TypeRenderComponentJsxPropsPublic &
  ControllerFormFieldCurrencyProps;
export function BBFCurrency(_props: TypeControllerFormFieldCurrencyPublicProps) {
  return 'a-currency:formFieldCurrency';
}
