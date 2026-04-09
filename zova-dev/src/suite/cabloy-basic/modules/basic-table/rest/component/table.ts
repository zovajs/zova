import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerTableProps } from 'zova-module-basic-table';

type TypeControllerTablePublicProps<TData extends {} = {}> = TypeRenderComponentJsxPropsPublic & ControllerTableProps<TData>;
export function BBZBasicTable<TData extends {} = {}>(_props: TypeControllerTablePublicProps<TData>) {
  return 'basic-table:table';
}
