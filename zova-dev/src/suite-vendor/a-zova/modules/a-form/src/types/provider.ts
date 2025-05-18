import type { TypeComponentRecordSelectorKeysStrict } from 'zova';
import type { TypeBehaviorRecordSelectorKeysStrict } from 'zova-module-a-behavior';
import type { TypeRenderComponent } from 'zova-module-a-openapi';

export interface IFormProviderBehaviors {
  formField?: TypeBehaviorRecordSelectorKeysStrict<'formField'>;
  formFieldLayout?: TypeBehaviorRecordSelectorKeysStrict<'formFieldLayout'>;
  formFieldModel?: TypeBehaviorRecordSelectorKeysStrict<'formFieldModel'>;
}

export interface IFormProviderComponents {
  // table?: TypeComponentRecordSelectorKeysStrict<'restTable'>;
  formField?: TypeComponentRecordSelectorKeysStrict<'formField'>;
  text?: TypeFormProviderComponent;
}

export interface IFormProvider {
  components?: IFormProviderComponents;
  behaviors?: IFormProviderBehaviors;
}

export type TypeFormProviderComponent = TypeRenderComponent;
