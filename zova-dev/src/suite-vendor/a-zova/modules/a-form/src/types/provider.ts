import type { TypeComponentRecordSelectorKeysStrict } from 'zova';
import type { TypeBehaviorRecordSelectorKeys, TypeBehaviorRecordSelectorKeysStrict } from 'zova-module-a-behavior';
import type { TypeRenderComponentProvider } from 'zova-module-a-openapi';

export interface IFormProviderBehaviors {
  formField?: TypeBehaviorRecordSelectorKeysStrict<'formField'>;
  formFieldLayout?: TypeBehaviorRecordSelectorKeys<'formFieldLayout'>;
  formFieldModel?: TypeBehaviorRecordSelectorKeys<'formFieldModel'>;
}

export interface IFormProviderComponents {
  // table?: TypeComponentRecordSelectorKeysStrict<'restTable'>;
  formField?: TypeComponentRecordSelectorKeysStrict<'formField'>;
  text?: TypeRenderComponentProvider;
}

export interface IFormProvider {
  components?: IFormProviderComponents;
  behaviors?: IFormProviderBehaviors;
}

declare module 'zova-module-a-openapi'{
  export interface IOpenApiOptionsRestResourceForm {
    provider?: IFormProvider;
  }
}
