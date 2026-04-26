import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerLayoutTabsProps } from 'zova-module-home-layouttabs';

type TypeControllerLayoutTabsPublicProps = TypeRenderComponentJsxPropsPublic &
  ControllerLayoutTabsProps;
export function BBZHomeLayouttabsLayoutTabs(_props: TypeControllerLayoutTabsPublicProps) {
  return 'home-layouttabs:layoutTabs';
}
