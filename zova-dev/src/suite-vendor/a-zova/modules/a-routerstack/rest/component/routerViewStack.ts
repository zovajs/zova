import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerRouterViewStackProps } from 'zova-module-a-routerstack';

type TypeControllerRouterViewStackPublicProps = TypeRenderComponentJsxPropsPublic &
  ControllerRouterViewStackProps;
export function BBZRouterstackRouterViewStack(_props: TypeControllerRouterViewStackPublicProps) {
  return 'a-routerstack:routerViewStack';
}
