import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerBlockTableProps } from 'zova-module-basic-page';

type TypeControllerBlockTablePublicProps = TypeRenderComponentJsxPropsPublic &
  ControllerBlockTableProps;
export function BBZBasicPageBlockTable(_props: TypeControllerBlockTablePublicProps) {
  return 'basic-page:blockTable';
}
