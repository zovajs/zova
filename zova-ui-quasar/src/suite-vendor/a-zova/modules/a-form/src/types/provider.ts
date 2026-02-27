import type { TypeComponentRecordSelectorKeysStrict } from 'zova';
import type { IActionsRecord } from 'zova-module-a-action';
import type { TypeBehaviorRecordSelectorKeys, TypeBehaviorRecordSelectorKeysStrict } from 'zova-module-a-behavior';
import type { TypeFormFieldRenderComponentProvider } from 'zova-module-a-openapi';

export interface IFormProviderBehaviors {
  formField?: TypeBehaviorRecordSelectorKeysStrict<'formField'>;
  formFieldLayout?: TypeBehaviorRecordSelectorKeys<'formFieldLayout'>;
}

export interface IFormProviderComponents {
  formField?: TypeComponentRecordSelectorKeysStrict<'formField'>;
  text?: TypeFormFieldRenderComponentProvider;
  password?: TypeFormFieldRenderComponentProvider;
  captcha?: TypeFormFieldRenderComponentProvider;
  currency?: TypeFormFieldRenderComponentProvider;
  date?: TypeFormFieldRenderComponentProvider;
  dateRange?: TypeFormFieldRenderComponentProvider;
  toggle?: TypeFormFieldRenderComponentProvider;
  select?: TypeFormFieldRenderComponentProvider;
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
