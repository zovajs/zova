import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerWrapperTableProps } from '../../src/component/wrapperTable/controller.jsx';

type TypeControllerWrapperTablePublicProps<TData extends {} = {}> = TypeRenderComponentJsxPropsPublic
  & ControllerWrapperTableProps<TData>;
export function ZZDevuiRestpageWrapperTable<TData extends {} = {}>(
  _props: TypeControllerWrapperTablePublicProps<TData>,
) {
  return 'devui-restpage:wrapperTable';
}
