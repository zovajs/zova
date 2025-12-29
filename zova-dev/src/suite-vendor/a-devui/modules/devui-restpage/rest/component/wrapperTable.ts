import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerWrapperTableProps } from '../../src/component/wrapperTable/controller.jsx';

type TypeControllerWrapperTablePublicProps<T extends {} = {}> = TypeRenderComponentJsxPropsPublic
  & ControllerWrapperTableProps<T>;
export function ZDevuiRestpageWrapperTable<T extends {} = {}>(
  _props: TypeControllerWrapperTablePublicProps<T>,
) {
  return 'devui-restpage:wrapperTable';
}
