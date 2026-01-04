import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerTableProps } from '../../src/component/table/controller.jsx';

type TypeControllerTablePublicProps<TData extends unknown | object | any[] = unknown | object | any[]> = TypeRenderComponentJsxPropsPublic
  & ControllerTableProps<TData>;
export function ZDevuiTableTable<TData extends unknown | object | any[] = unknown | object | any[]>(
  _props: TypeControllerTablePublicProps<TData>,
) {
  return 'devui-table:table';
}
