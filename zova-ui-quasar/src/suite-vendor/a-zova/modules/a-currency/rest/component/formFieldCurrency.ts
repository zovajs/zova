import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerFormFieldCurrencyProps } from '../../src/component/formFieldCurrency/controller.jsx';

type TypeControllerFormFieldCurrencyPublicProps = TypeRenderComponentJsxPropsPublic &
  ControllerFormFieldCurrencyProps;
export function FFCurrency(
  _props: TypeControllerFormFieldCurrencyPublicProps,
) {
  return 'a-currency:formFieldCurrency';
}
