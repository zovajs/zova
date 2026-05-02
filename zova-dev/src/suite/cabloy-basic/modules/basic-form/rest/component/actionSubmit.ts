import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerActionSubmitProps } from 'zova-module-basic-form';

type TypeControllerActionSubmitPublicProps = TypeRenderComponentJsxPropsPublic &
  ControllerActionSubmitProps;
export function BBZBasicFormActionSubmit(_props: TypeControllerActionSubmitPublicProps) {
  return 'basic-form:actionSubmit';
}
