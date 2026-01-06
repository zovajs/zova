import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerBehaviorProps } from '../../src/component/behavior/controller.jsx';

type TypeControllerBehaviorPublicProps = TypeRenderComponentJsxPropsPublic
  & ControllerBehaviorProps;
export function ZZBehavior(
  _props: TypeControllerBehaviorPublicProps,
) {
  return 'a-behavior:behavior';
}
