import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerTableProps } from '../../src/component/table/controller.jsx';

type TypeControllerTablePublicProps<T extends {} = {}> = TypeRenderComponentJsxPropsPublic
  & ControllerTableProps<T>;
export function ZDevuiTableTable<T extends {} = {}>(
  _props: TypeControllerTablePublicProps<T>,
) {
  return 'devui-table:table';
}
