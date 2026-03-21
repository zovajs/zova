import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';

import type { ControllerLayoutEmptyProps } from '../../src/component/layoutEmpty/controller.jsx';

type TypeControllerLayoutEmptyPublicProps = TypeRenderComponentJsxPropsPublic & ControllerLayoutEmptyProps;
export function ZZHomeLayoutEmpty(_props: TypeControllerLayoutEmptyPublicProps) {
  return 'home-layout:layoutEmpty';
}
