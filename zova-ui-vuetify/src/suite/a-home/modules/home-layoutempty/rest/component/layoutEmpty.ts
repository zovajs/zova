import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerLayoutEmptyProps } from '../../src/component/layoutEmpty/controller.jsx';

type TypeControllerLayoutEmptyPublicProps = TypeRenderComponentJsxPropsPublic &
  ControllerLayoutEmptyProps;
export function ZZHomeLayoutemptyLayoutEmpty(
  _props: TypeControllerLayoutEmptyPublicProps,
) {
  return 'home-layoutempty:layoutEmpty';
}
