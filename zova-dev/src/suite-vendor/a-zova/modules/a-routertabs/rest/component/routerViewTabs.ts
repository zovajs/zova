import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerRouterViewTabsProps } from '../../src/component/routerViewTabs/controller.jsx';

type TypeControllerRouterViewTabsPublicProps = TypeRenderComponentJsxPropsPublic
  & ControllerRouterViewTabsProps;
export function ZZRoutertabsRouterViewTabs(
  _props: TypeControllerRouterViewTabsPublicProps,
) {
  return 'a-routertabs:routerViewTabs';
}
