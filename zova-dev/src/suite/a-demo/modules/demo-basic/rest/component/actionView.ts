import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerActionViewProps } from '../../src/component/actionView/controller.jsx';

type TypeControllerActionViewPublicProps = TypeRenderComponentJsxPropsPublic
  & ControllerActionViewProps;
export function ZZDemoBasicActionView(
  _props: TypeControllerActionViewPublicProps,
) {
  return 'demo-basic:actionView';
}
