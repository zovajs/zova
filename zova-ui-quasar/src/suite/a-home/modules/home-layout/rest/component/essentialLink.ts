import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerEssentialLinkProps } from '../../src/component/essentialLink/controller.jsx';

type TypeControllerEssentialLinkPublicProps = TypeRenderComponentJsxPropsPublic
  & ControllerEssentialLinkProps;
export function ZZHomeLayoutEssentialLink(
  _props: TypeControllerEssentialLinkPublicProps,
) {
  return 'home-layout:essentialLink';
}
