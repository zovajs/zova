import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerCardProps } from '../../src/component/card/controller.jsx';

type TypeControllerCardPublicProps = TypeRenderComponentJsxPropsPublic
  & ControllerCardProps;
export function ZZDemoBasicCard(
  _props: TypeControllerCardPublicProps,
) {
  return 'demo-basic:card';
}
