import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerActionViewProps } from 'zova-module-demo-basic';

type TypeControllerActionViewPublicProps = TypeRenderComponentJsxPropsPublic &
  ControllerActionViewProps;
export function BBZDemoBasicActionView(_props: TypeControllerActionViewPublicProps) {
  return 'demo-basic:actionView';
}
