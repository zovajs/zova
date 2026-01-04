import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerTableProps } from '../../src/component/table/controller.jsx';

type TypeControllerTablePublicProps<TData extends any[] = any[]> = TypeRenderComponentJsxPropsPublic
  & ControllerTableProps<TData>;
export function ZATableTable<TData extends any[] = any[]>(
  _props: TypeControllerTablePublicProps<TData>,
) {
  return 'a-table:table';
}
