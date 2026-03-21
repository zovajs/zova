import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';

import type { ControllerFormFieldDateRangeProps } from '../../src/component/formFieldDateRange/controller.jsx';

type TypeControllerFormFieldDateRangePublicProps = TypeRenderComponentJsxPropsPublic & ControllerFormFieldDateRangeProps;
export function FFBasicDateRange(_props: TypeControllerFormFieldDateRangePublicProps) {
  return 'basic-date:formFieldDateRange';
}
