import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';

import type { ControllerLayoutTabsProps } from '../../src/component/layoutTabs/controller.jsx';

type TypeControllerLayoutTabsPublicProps = TypeRenderComponentJsxPropsPublic & ControllerLayoutTabsProps;
export function ZZHomeLayoutTabs(_props: TypeControllerLayoutTabsPublicProps) {
  return 'home-layout:layoutTabs';
}
