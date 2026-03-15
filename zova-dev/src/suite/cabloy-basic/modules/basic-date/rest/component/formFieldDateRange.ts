import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerFormFieldDateRangeProps } from '../../src/component/formFieldDateRange/controller.jsx';

type TypeControllerFormFieldDateRangePublicProps = TypeRenderComponentJsxPropsPublic
  & ControllerFormFieldDateRangeProps;
export function FFDevuiDateRange(
  _props: TypeControllerFormFieldDateRangePublicProps,
) {
  return 'devui-date:formFieldDateRange';
}
