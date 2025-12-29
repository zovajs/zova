import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerWrapperFormProps } from '../../src/component/wrapperForm/controller.jsx';

type TypeControllerWrapperFormPublicProps = TypeRenderComponentJsxPropsPublic
  & ControllerWrapperFormProps;
export function ZDevuiRestpageWrapperForm(
  _props: TypeControllerWrapperFormPublicProps,
) {
  return 'devui-restpage:wrapperForm';
}
