import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerFormFieldTestProps } from 'zova-module-demo-basic';

type TypeControllerFormFieldTestPublicProps = TypeRenderComponentJsxPropsPublic &
  ControllerFormFieldTestProps;
export function BBFDemoBasicTest(_props: TypeControllerFormFieldTestPublicProps) {
  return 'demo-basic:formFieldTest';
}
