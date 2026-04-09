import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerLayoutEmptyProps } from 'zova-module-home-layout';

type TypeControllerLayoutEmptyPublicProps = TypeRenderComponentJsxPropsPublic & ControllerLayoutEmptyProps;
export function BBZHomeLayoutEmpty(_props: TypeControllerLayoutEmptyPublicProps) {
  return 'home-layout:layoutEmpty';
}
