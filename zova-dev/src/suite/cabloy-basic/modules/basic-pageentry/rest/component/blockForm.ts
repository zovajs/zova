import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerBlockFormProps } from 'zova-module-basic-pageentry';

type TypeControllerBlockFormPublicProps = TypeRenderComponentJsxPropsPublic &
  ControllerBlockFormProps;
export function BBZBasicPageentryBlockForm(_props: TypeControllerBlockFormPublicProps) {
  return 'basic-pageentry:blockForm';
}
