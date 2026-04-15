import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerCardProps } from 'zova-module-demo-basic';

type TypeControllerCardPublicProps = TypeRenderComponentJsxPropsPublic & ControllerCardProps;
export function BBZDemoBasicCard(_props: TypeControllerCardPublicProps) {
  return 'demo-basic:card';
}
