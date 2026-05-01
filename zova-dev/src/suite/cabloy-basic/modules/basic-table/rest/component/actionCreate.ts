import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerActionCreateProps } from 'zova-module-basic-table';

type TypeControllerActionCreatePublicProps = TypeRenderComponentJsxPropsPublic &
  ControllerActionCreateProps;
export function BBZBasicTableActionCreate(_props: TypeControllerActionCreatePublicProps) {
  return 'basic-table:actionCreate';
}
