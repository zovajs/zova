import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';

import type { ControllerPageProps } from '../../src/component/page/controller.jsx';

type TypeControllerPagePublicProps = TypeRenderComponentJsxPropsPublic & ControllerPageProps;
export function ZZHomeBasePage(_props: TypeControllerPagePublicProps) {
  return 'home-base:page';
}
