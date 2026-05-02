import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerActionBackProps } from 'zova-module-basic-form';

type TypeControllerActionBackPublicProps = TypeRenderComponentJsxPropsPublic &
  ControllerActionBackProps;
export function BBZBasicFormActionBack(_props: TypeControllerActionBackPublicProps) {
  return 'basic-form:actionBack';
}
