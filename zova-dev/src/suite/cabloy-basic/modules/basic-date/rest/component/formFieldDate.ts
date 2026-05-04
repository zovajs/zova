import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerFormFieldDateProps } from 'zova-module-basic-date';

type TypeControllerFormFieldDatePublicProps = TypeRenderComponentJsxPropsPublic &
  ControllerFormFieldDateProps;
export function BBFBasicDate(_props: TypeControllerFormFieldDatePublicProps) {
  return 'basic-date:formFieldDate';
}
