import type { TypePropUpdateFromModel, TypePropValueFromModel } from 'zova';
import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerDateRangeModels, ControllerDateRangeProps } from 'zova-module-basic-date';

type TypeControllerDateRangePublicProps = TypeRenderComponentJsxPropsPublic &
  ControllerDateRangeProps &
  ControllerDateRangeModels & {
    [KEY in keyof ControllerDateRangeModels as TypePropValueFromModel<KEY>]: ControllerDateRangeModels[KEY];
  } & {
    [KEY in keyof ControllerDateRangeModels as TypePropUpdateFromModel<KEY>]: (value: ControllerDateRangeModels[KEY]) => void;
  };
export function BBZBasicDateRange(_props: TypeControllerDateRangePublicProps) {
  return 'basic-date:dateRange';
}
