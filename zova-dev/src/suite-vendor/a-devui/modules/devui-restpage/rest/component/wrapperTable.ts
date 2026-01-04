import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerWrapperTableProps } from '../../src/component/wrapperTable/controller.jsx';

type TypeControllerWrapperTablePublicProps<TData extends {} = {}> = TypeRenderComponentJsxPropsPublic
  & ControllerWrapperTableProps<TData>;
export function ZDevuiRestpageWrapperTable<TData extends {} = {}>(
  _props: TypeControllerWrapperTablePublicProps<TData>,
) {
  return 'devui-restpage:wrapperTable';
}
