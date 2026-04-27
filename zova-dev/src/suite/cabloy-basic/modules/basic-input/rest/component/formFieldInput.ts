import type { TypeRenderComponentJsxPropsPublic } from 'zova-jsx';
import type { ControllerFormFieldInputProps } from 'zova-module-basic-input';

type TypeControllerFormFieldInputPublicProps = TypeRenderComponentJsxPropsPublic &
  ControllerFormFieldInputProps;
export function BBFBasicInput(_props: TypeControllerFormFieldInputPublicProps) {
  return 'basic-input:formFieldInput';
}
