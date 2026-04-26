import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerBehaviorProps } from 'zova-module-a-behavior';

type TypeControllerBehaviorPublicProps = TypeRenderComponentJsxPropsPublic &
  ControllerBehaviorProps;
export function BBZBehavior(_props: TypeControllerBehaviorPublicProps) {
  return 'a-behavior:behavior';
}
