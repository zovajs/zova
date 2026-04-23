import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerFormFieldDateProps } from 'zova-module-a-date';

type TypeControllerFormFieldDatePublicProps = TypeRenderComponentJsxPropsPublic & ControllerFormFieldDateProps;
export function BBFDate(_props: TypeControllerFormFieldDatePublicProps) {
  return 'a-date:formFieldDate';
}
