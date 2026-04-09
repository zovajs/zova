import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerTableProps } from 'zova-module-a-table';

type TypeControllerTablePublicProps<TData extends {} = {}> = TypeRenderComponentJsxPropsPublic & ControllerTableProps<TData>;
export function BBZTable<TData extends {} = {}>(_props: TypeControllerTablePublicProps<TData>) {
  return 'a-table:table';
}
