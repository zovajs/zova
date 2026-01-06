import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerLayoutDefaultProps } from '../../src/component/layoutDefault/controller.jsx';

type TypeControllerLayoutDefaultPublicProps = TypeRenderComponentJsxPropsPublic
  & ControllerLayoutDefaultProps;
export function ZHomeLayoutDefault(
  _props: TypeControllerLayoutDefaultPublicProps,
) {
  return 'home-layout:layoutDefault';
}
