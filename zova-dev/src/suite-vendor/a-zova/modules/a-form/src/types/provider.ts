import type { TypeComponentRecordSelectorKeysStrict } from 'zova';
import type { IActionsRecord } from 'zova-module-a-action';
import type { TypeBehaviorRecordSelectorKeys, TypeBehaviorRecordSelectorKeysStrict } from 'zova-module-a-behavior';
import type { TypeFormFieldRenderComponentProvider } from 'zova-module-a-openapi';

export interface IFormProviderBehaviors {
  FormField?: TypeBehaviorRecordSelectorKeysStrict<'formField'>;
  FormFieldLayout?: TypeBehaviorRecordSelectorKeys<'formFieldLayout'>;
}

export interface IFormProviderComponents {
  FormField?: TypeComponentRecordSelectorKeysStrict<'formField'>;
  Input?: TypeFormFieldRenderComponentProvider;
  Captcha?: TypeFormFieldRenderComponentProvider;
  Currency?: TypeFormFieldRenderComponentProvider;
  Date?: TypeFormFieldRenderComponentProvider;
  DateRange?: TypeFormFieldRenderComponentProvider;
  Toggle?: TypeFormFieldRenderComponentProvider;
  Select?: TypeFormFieldRenderComponentProvider;
  Textarea?: TypeFormFieldRenderComponentProvider;
  ResourcePicker?: TypeFormFieldRenderComponentProvider;
  ActionOperationsRow?: TypeFormFieldRenderComponentProvider;
}

export interface IFormProvider {
  components?: IFormProviderComponents;
  actions?: IActionsRecord;
  behaviors?: IFormProviderBehaviors;
}

declare module 'zova-module-a-openapi' {
  export interface IOpenapiOptionsResourceMetaForm {
    provider?: IFormProvider;
  }
}
