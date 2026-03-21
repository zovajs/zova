import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';

import type { ControllerItemLinkProps } from '../../src/component/itemLink/controller.jsx';

type TypeControllerItemLinkPublicProps = TypeRenderComponentJsxPropsPublic & ControllerItemLinkProps;
export function ZZHomeLayoutItemLink(_props: TypeControllerItemLinkPublicProps) {
  return 'home-layout:itemLink';
}
