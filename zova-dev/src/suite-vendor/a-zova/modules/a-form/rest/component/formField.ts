import type { ControllerFormFieldProps } from '../../src/component/formField/controller.jsx';

export function ZFormField<TParentData extends {} = {}>(_props: ControllerFormFieldProps<TParentData>) {
  return 'a-form:formField';
}
