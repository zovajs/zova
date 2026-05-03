import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerBlockPageEntryProps } from 'zova-module-basic-pageentry';

type TypeControllerBlockPageEntryPublicProps = TypeRenderComponentJsxPropsPublic &
  ControllerBlockPageEntryProps;
export function BBZBasicPageentryBlockPageEntry(_props: TypeControllerBlockPageEntryPublicProps) {
  return 'basic-pageentry:blockPageEntry';
}
