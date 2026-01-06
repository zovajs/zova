import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerFormFieldTestProps } from '../../src/component/formFieldTest/controller.jsx';

type TypeControllerFormFieldTestPublicProps = TypeRenderComponentJsxPropsPublic
  & ControllerFormFieldTestProps;
export function FFDemoBasicTest(
  _props: TypeControllerFormFieldTestPublicProps,
) {
  return 'demo-basic:formFieldTest';
}
