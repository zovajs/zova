import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerRouterViewStackProps } from '../../src/component/routerViewStack/controller.jsx';

type TypeControllerRouterViewStackPublicProps = TypeRenderComponentJsxPropsPublic
  & ControllerRouterViewStackProps;
export function ZZRouterstackRouterViewStack(
  _props: TypeControllerRouterViewStackPublicProps,
) {
  return 'a-routerstack:routerViewStack';
}
