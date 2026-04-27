import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerTableProps } from 'zova-module-basic-table';

type TypeControllerTablePublicProps = TypeRenderComponentJsxPropsPublic & ControllerTableProps;
export function BBZBasicTable(_props: TypeControllerTablePublicProps) {
  return 'basic-table:table';
}
