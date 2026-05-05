import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerBlockFilterProps } from 'zova-module-basic-page';

type TypeControllerBlockFilterPublicProps = TypeRenderComponentJsxPropsPublic &
  ControllerBlockFilterProps;
export function BBZBasicPageBlockFilter(_props: TypeControllerBlockFilterPublicProps) {
  return 'basic-page:blockFilter';
}
