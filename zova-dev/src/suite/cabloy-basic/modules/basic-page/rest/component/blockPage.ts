import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerBlockPageProps } from 'zova-module-basic-page';

type TypeControllerBlockPagePublicProps = TypeRenderComponentJsxPropsPublic &
  ControllerBlockPageProps;
export function BBZBasicPageBlockPage(_props: TypeControllerBlockPagePublicProps) {
  return 'basic-page:blockPage';
}
