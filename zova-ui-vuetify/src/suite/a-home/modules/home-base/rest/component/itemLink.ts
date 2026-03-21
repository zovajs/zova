import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';

import type { ControllerItemLinkProps } from '../../src/component/itemLink/controller.jsx';

type TypeControllerItemLinkPublicProps = TypeRenderComponentJsxPropsPublic & ControllerItemLinkProps;
export function ZZHomeBaseItemLink(_props: TypeControllerItemLinkPublicProps) {
  return 'home-base:itemLink';
}
