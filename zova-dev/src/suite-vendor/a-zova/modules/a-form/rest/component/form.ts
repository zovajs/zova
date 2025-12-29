import type { ControllerFormProps } from '../../src/component/form/controller.jsx';

export function ZAFormForm<TFormData extends {} = {}, TSubmitMeta = never>(_props: ControllerFormProps<TFormData,TSubmitMeta>) {
  return 'a-form:form';
}
