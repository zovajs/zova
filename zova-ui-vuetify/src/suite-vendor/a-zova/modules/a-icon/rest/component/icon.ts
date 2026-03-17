import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerIconProps } from '../../src/component/icon/controller.jsx';

type TypeControllerIconPublicProps = TypeRenderComponentJsxPropsPublic
  & ControllerIconProps;
export function ZZIcon(
  _props: TypeControllerIconPublicProps,
) {
  return 'a-icon:icon';
}
