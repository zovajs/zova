import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerPageProps } from 'zova-module-home-base';

type TypeControllerPagePublicProps = TypeRenderComponentJsxPropsPublic & ControllerPageProps;
export function BBZHomeBasePage(_props: TypeControllerPagePublicProps) {
  return 'home-base:page';
}
