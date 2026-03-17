import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerTableProps } from '../../src/component/table/controller.jsx';

type TypeControllerTablePublicProps<TData extends {} = {}> = TypeRenderComponentJsxPropsPublic
  & ControllerTableProps<TData>;
export function ZZTable<TData extends {} = {}>(
  _props: TypeControllerTablePublicProps<TData>,
) {
  return 'a-table:table';
}
