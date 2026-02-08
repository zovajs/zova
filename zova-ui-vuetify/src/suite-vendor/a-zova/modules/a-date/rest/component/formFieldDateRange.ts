import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerFormFieldDateRangeProps } from '../../src/component/formFieldDateRange/controller.jsx';

type TypeControllerFormFieldDateRangePublicProps = TypeRenderComponentJsxPropsPublic
  & ControllerFormFieldDateRangeProps;
export function FFDateRange(
  _props: TypeControllerFormFieldDateRangePublicProps,
) {
  return 'a-date:formFieldDateRange';
}
