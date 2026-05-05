import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerBlockPagerProps } from 'zova-module-basic-page';

type TypeControllerBlockPagerPublicProps = TypeRenderComponentJsxPropsPublic &
  ControllerBlockPagerProps;
export function BBZBasicPageBlockPager(_props: TypeControllerBlockPagerPublicProps) {
  return 'basic-page:blockPager';
}
