import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerRouterViewLocationProps } from '../../src/component/routerViewLocation/controller.jsx';

type TypeControllerRouterViewLocationPublicProps = TypeRenderComponentJsxPropsPublic
  & ControllerRouterViewLocationProps;
export function ZZTabsRouterViewLocation(
  _props: TypeControllerRouterViewLocationPublicProps,
) {
  return 'a-tabs:routerViewLocation';
}
