import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerRouterViewTabsProps } from '../../src/component/routerViewTabs/controller.jsx';

type TypeControllerRouterViewTabsPublicProps = TypeRenderComponentJsxPropsPublic
  & ControllerRouterViewTabsProps;
export function ZATabsRouterViewTabs(
  _props: TypeControllerRouterViewTabsPublicProps,
) {
  return 'a-tabs:routerViewTabs';
}
