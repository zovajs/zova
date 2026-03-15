import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerWrapperFilterProps } from '../../src/component/wrapperFilter/controller.jsx';

type TypeControllerWrapperFilterPublicProps = TypeRenderComponentJsxPropsPublic
  & ControllerWrapperFilterProps;
export function ZZDevuiRestpageWrapperFilter(
  _props: TypeControllerWrapperFilterPublicProps,
) {
  return 'devui-restpage:wrapperFilter';
}
